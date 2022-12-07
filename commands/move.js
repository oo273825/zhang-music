const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "move",
  description: "將歌曲移到指定位置",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["m"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **現在沒有播放的曲目...**"
      );
    if (!args[0] || !args[1])
      return client.sendTime(message.channel, "❌ | **無效的參數**");

    // Check if (args[0] - 1) is a valid index
    let trackNum = parseInt(args[0] - 1);
    if (trackNum < 1 || trackNum > player.queue.length - 1) {
      return client.sendTime(message.channel, "❌ | **無效的曲目編號**");
    }

    let dest = parseInt(args[1] - 1);
    if (dest < 1 || dest > player.queue.length - 1) {
      return client.sendTime(
        message.channel,
        "❌ | **無效的曲目目的**"
      );
    }

    // Remove from and shift array
    const track = player.queue[trackNum];
    player.queue.splice(trackNum, 1);
    player.queue.splice(dest, 0, track);
    client.sendTime(
      message.channel,
      "✅ | **" +
        track.title +
        "** 已經移至 " +
        (dest + 1) +
        "."
    );
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "track",
        type: 4,
        required: true,
        description: "曲目移動",
      },
      {
        name: "position",
        value: "track2",
        type: 4,
        required: true,
        description: "將選定的曲目移至指定位置.",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      let player = await client.Manager.get(interaction.guild.id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **現在沒有播放的曲目...**"
        );
      if (!args[0].value || !args[1].value)
        return client.sendTime(interaction, "❌ | **無效的曲目編號**");

      // Check if (args[0] - 1) is a valid index
      let trackNum = parseInt(args[0].value - 1);
      if (trackNum < 1 || trackNum > player.queue.length - 1) {
        return client.sendTime(interaction, "❌ | **無效的曲目編號**");
      }

      let dest = parseInt(args[1].value - 1);
      if (dest < 1 || dest > player.queue.length - 1) {
        return client.sendTime(
          interaction,
          "❌ | **無效的曲目目的**"
        );
      }

      // Remove from and shift array
      const track = player.queue[trackNum];
      player.queue.splice(trackNum, 1);
      player.queue.splice(dest, 0, track);
      client.sendTime(
        interaction,
        "✅ | **" +
          track.title +
          "** 已經移至 " +
          (dest + 1) +
          "."
      );
    },
  },
};
