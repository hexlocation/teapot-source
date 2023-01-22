const fs = require("fs");
const Discord = require("discord.js");
const logger = require("../logger");
module.exports = {
  admin: true,
  description: "Make announcements to all catlovers! *(admin-only)*",
  run: async (msg) => {
    var sett = JSON.parse(fs.readFileSync("settings.json"));
    if (sett["admins"].includes(msg.author.id)) {
      var args = msg.content.replace("+announce ", "");
      var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));
      for (const guild in cathooks) {
        try {
          const wh = new Discord.WebhookClient({ url: cathooks[guild] });
          wh.send("``Admin Announcement`` " + args);
        } catch {
          logger.error("Failed to announce to guild: " + guild);
        }
      }
    }
  },
};
