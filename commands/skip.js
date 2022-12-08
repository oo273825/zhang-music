const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "skip",
  description: "跳過當前歌曲",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["s", "next"],
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
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **你必須先加入語音頻道!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**"
      );
    player.stop();
    await message.react("✅");
  },
  SlashCommand: {
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **你必須先加入語音頻道!**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**"
        );

      const skipTo = interaction.data.options
        ? interaction.data.options[0].value
        : null;

      let player = await client.Manager.get(interaction.guild_id);

      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **現在沒有播放的曲目...**"
        );
      console.log(interaction.data);
      if (
        skipTo !== null &&
        (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)
      )
        return client.sendTime(interaction, "❌ | **無效的曲目編號!**");
      player.stop(skipTo);
      client.sendTime(interaction, "**Skipped!**");
    },
  },
};
