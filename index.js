const fs = require("fs");
const axios = require("axios");
const Discord = require("discord.js");
const cooldown = new Set();
const { ActivityType } = require("discord.js");
const { Console } = require("console");
var https = require("https");
var agent = new https.Agent({ family: 4 });
const bot = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
const logger = require("./logger");
bot.on("ready", () => {
  bot.user.setPresence({
    activities: [
      {
        type: ActivityType.Watching,
        name: "cats yay!1!",
      },
    ],
    status: "dnd",
  });
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  console.log(
    "skidded cat bot ong date: " +
      year.toString() +
      "-" +
      month.toString() +
      "-" +
      date.toString()
  );
  setInterval(function () {
    getCat();
  }, 2 * 60000);
  setInterval(function () {
    sender();
  }, 10 * 60000);
  setInterval(function () {
    try {
      holidayCheck();
    } catch {
      logger.error("ERR: invalid webhook (?)");
    }
  }, 510000);
});
bot.on("messageCreate", (msg) => {
  const cmdz = JSON.parse(fs.readFileSync("commands.json"));
  if (msg.content.startsWith("+")) {
    logger.info(cmdz[msg.content.split(" ")[0].replace("+", "")]);
    if (cmdz[msg.content.split(" ")[0].replace("+", "")] != undefined) {
      if (cooldown.has(msg.author.id)) {
        msg.reply("You are on a cooldown!");
      } else {
        var comm = cmdz[msg.content.split(" ")[0].replace("+", "")];
        const command = require("./commands/" + comm);
        try {
          command.run(msg);
        } catch {
          logger.error(
            "An error has occured executing the following command: " + comm
          );
        } finally {
          cooldown.add(msg.author.id);
          setTimeout(() => {
            cooldown.delete(msg.author.id);
          }, 10000);
        }
      }
    }
  }
});

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id == "1062794292885733517") {
    member.guild.channels.fetch("1062799489766785045").then((c) => {
      c.send(
        "``" +
          member.user.username +
          "#" +
          member.user.discriminator +
          "`` has joined!"
      );
    });
    var cat = member.guild.roles.cache.find(
      (role) => role.id === "1062797176096436304"
    );
    member.roles.add(cat);
  }
});
if (JSON.parse(fs.readFileSync("settings.json"))["debug"] == true) {
  bot.login(JSON.parse(fs.readFileSync("settings.json"))["debugToken"]);
} else {
  bot.login(JSON.parse(fs.readFileSync("settings.json"))["token"]);
}

function getCat() {
  axios
    .get(
      "https://api.thecatapi.com/v1/images/search?api_key=" +
        JSON.parse(fs.readFileSync("settings.json"))["apikey"],
      { httpsAgent: agent }
    )
    .then((resp) => {
      if (resp.data != undefined) {
        var catJs = resp.data[0];
        var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));
        for (const guild in cathooks) {
          const wh = new Discord.WebhookClient({ url: cathooks[guild] });
          wh.send(catJs["url"]).catch((err) => {
            logger.error("(**getCat()**) " + err);
            delete cathooks[guild];
            fs.writeFileSync("cathooks.json", JSON.stringify(cathooks));
            logger.error("error sending catto to " + guild);
          });
        }
      }
    })
    .catch((err) => {
      logger.error(err);
    });
}

function sender() {
  var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));
  for (const guild in cathooks) {
    const wh = new Discord.WebhookClient({ url: cathooks[guild] });
    wh.send(
      ":sparkles: Did you know: We have a discord server! https://shush-is.online/discord.php :sparkles:"
    ).catch((err) => {
      logger.error("(**sender()**)" + err);
      delete cathooks[guild];
      fs.writeFileSync("cathooks.json", JSON.stringify(cathooks));
      logger.error("error sending catto to " + guild);
    });
  }
}

function holidayCheck() {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  var holidays = JSON.parse(fs.readFileSync("holidays.json"));
  var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));
  if (
    holidays[
      year.toString() + "-" + month.toString() + "-" + date.toString()
    ] != undefined
  ) {
    var ann =
      holidays[
        year.toString() + "-" + month.toString() + "-" + date.toString()
      ]["annc"];
    for (const guild in cathooks) {
      const wh = new Discord.WebhookClient({ url: cathooks[guild] });
      wh.send(ann).catch((err) => {
        logger.error("(**holidayCheck()**)" + err);
        delete cathooks[guild];
        fs.writeFileSync("cathooks.json", JSON.stringify(cathooks));
        logger.error("error sending catto to " + guild);
      });
    }
  }
}

module.exports = agent;
