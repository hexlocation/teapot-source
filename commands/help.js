const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const logger = require("../logger.js");
module.exports = {
  description: "Help command",
  run: async (msg) => {
    const cmds = JSON.parse(fs.readFileSync("commands.json"));
    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setFooter({
        text:
          "Requested by " +
          msg.author.username +
          "#" +
          msg.author.discriminator,
        iconURL: msg.author.avatarURL(),
      })
      .setTitle("Teapot Help Menu");

    for (const a in cmds) {
      embed.addFields({
        name: "+" + a,
        value: require("./" + cmds[a]).description,
        inline: true,
      });
      embed.addFields({
        name: "_ _",
        value: "_ _",
        inline: true,
      });
      embed.addFields({
        name: "_ _",
        value: "_ _",
        inline: true,
      });
    }
    msg.channel.send({ embeds: [embed] });
  },
};
