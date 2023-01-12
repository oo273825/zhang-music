const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
  name: "luck",
  description: "測試今天的 你/妳 是幸福還是孤單?",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["lk"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[d], H[h], m[m]");

      space = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
      const final = Math.floor(Math.random() * (8 - 1)) + 1;
      task = " 哭哀 ";
      if (final==1){
        task="\xa0:heartbeat: \xa0小 幸福 ";
      };
      if (final==2){
        task="\xa0:sparkling_heart: \xa0中 幸福 ";
      };
      if (final==3){
        task="\xa0:revolving_hearts: \xa0大 幸福 ";
      };
      if (final==4){
        task="\xa0:heart: \xa0末 幸福 ";
      };
      if (final==5){
        task="\xa0:mending_heart: \xa0小 孤單 ";
      };
      if (final==6){
        task="\xa0:cupid: \xa0中 孤單 ";
      };
      if (final==7){
        task="\xa0:heart_on_fire: \xa0大 孤單 ";
      };
      if (final==8){
        task="\xa0:broken_heart: \xa0末 孤單 ";
      };
      
      let embede= new MessageEmbed()
      .setAuthor(
        "今天的 你/妳 是幸福還是孤單?",
        "https://github.com/oo273825/zhang-music/blob/main/deal-with-it.gif?raw=true"
      ).setColor("#00ffee").setDescription(`\n
      <<< ${message.author}  今天是  ${task} >>>
          \n${space}- 新莊張井朧`);
      message.channel.send(embede);
      
    });
    
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction) => {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D[d], H[h], m[m]");

        let embede= new MessageEmbed()
      .setAuthor(
        "今天的 你/妳 是幸福還是孤單?",
        "https://github.com/oo273825/zhang-music/blob/main/deal-with-it.gif?raw=true"
      ).setColor("#00ffee").setDescription(`\n
      <<< ${message.author}  今天是  ${task} >>>
            \n${space}- 新莊張井朧`);
      message.channel.send(embede);
      });
      },
  },
};



"今天的 你/妳 是幸福還是孤單?",
          "https://github.com/oo273825/zhang-music/blob/main/deal-with-it.gif?raw=true"
