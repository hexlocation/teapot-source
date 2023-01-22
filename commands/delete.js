const Discord = require("discord.js");
const fs = require("fs");
var settings = JSON.parse(fs.readFileSync("settings.json"));
const logger = require("../logger");
module.exports = {
  description: "Delete your epic cathook :(",
  run: async (msg) => {
    if (
      settings["admins"].includes(msg.author.id) ||
      msg.member.permissions.has("Administrator")
    ) {
      var cathooks = JSON.parse(fs.readFileSync("cathooks.json"));

      if (cathooks[msg.guild.id] != undefined) {
        try {
          await delete cathooks[msg.guild.id];
        } catch {
          l.logger.error("An error has occured deleting a webhook.");
          msg.reply(":warning: An error has occured deleting your cathook.");
        } finally {
          msg.reply(
            ":white_check_mark: Your cathook has been deleted successfully :("
          );
          try {
            await fs.writeFileSync("cathooks.json", JSON.stringify(cathooks));
          } catch {
            logger.error("An error has occured writing to the cathooks file?");
          }
        }
      } else {
        msg.reply(
          ":warning: An error has occured deleting your cathook. *(do you even have a cathook set up in the first place)*"
        );
        return;
      }
    }
  },
};
