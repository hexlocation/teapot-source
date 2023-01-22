const { EmbedBuilder } = require("discord.js");
const logger = require("../logger.js");
const agent = require("../index.js");

const axios = require("axios");
module.exports = {
  description: "Sends you a cat INSTANTLY! :cat: ",
  run: async (msg) => {
    const embed = new EmbedBuilder().setTitle("A new cat has appeared! :cat: ");
    axios
      .get("https://api.thecatapi.com/v1/images/search", { httpsAgent: agent })
      .then((resp) => {
        if (resp.data != undefined) {
          var catJs = resp.data[0];
          embed.setImage(catJs["url"]);
          msg.reply({ embeds: [embed] });
        }
      })
      .catch((err) => {
        logger.error(err);
      });
  },
};
