const Discord = require("discord.js");
const fs = require("fs");
const logger = require("../logger");
module.exports = {
  description: "Set your epic cathook :heart_eyes_cat:",
  run: async (msg) => {
    if (
      msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator) ||
      msg.author.id == "696339037971021865"
    ) {
      var channelID = msg.content
        .replace("+addcathook ", "")
        .replace("<#", "")
        .replace(">", "");
      if (msg.guild.channels.cache.get(channelID) != undefined) {
        var channl = msg.guild.channels.cache.get(channelID);
        channl
          .createWebhook({
            name: msg.guild.name + "'s Catto!",
            avatar: "https://shush-is.online/cat.jpg",
          })
          .then((webhook) => {
            var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));
            cathooks[msg.guild.id] = webhook.url;
            fs.writeFileSync("cathooks.json", JSON.stringify(cathooks));
            msg.reply(
              ":white_check_mark: Successfully setup your catto! :heart_eyes_cat: "
            );
          })
          .catch(logger.error);
      } else {
        msg.reply("Invalid channel!");
      }
    } else {
      msg.reply("No permissions!");
    }
  },
};
