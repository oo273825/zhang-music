const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "volume",
  description: "檢查或更改當前音量",
  usage: "<volume>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["vol", "v"],
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
    if (!args[0])
      return client.sendTime(
        message.channel,
        `🔉 | 目前音量 \`${player.volume}\`.`
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
    if (!parseInt(args[0]))
      return client.sendTime(
        message.channel,
        `**請選擇一個數字介於** \`1 - 100\``
      );
    let vol = parseInt(args[0]);
    if (vol < 0 || vol > 100) {
      return client.sendTime(
        message.channel,
        "❌ | **請選擇一個數字介於 `1-100`**"
      );
    } else {
      player.setVolume(vol);
      client.sendTime(
        message.channel,
        `🔉 | **音量設為** \`${player.volume}\``
      );
    }
  },
  SlashCommand: {
    options: [
      {
        name: "amount",
        value: "amount",
        type: 4,
        required: false,
        description: "輸入音量於 1-100. 預設為 100.",
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | 你必須先加入語音頻道!"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**"
        );
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **現在沒有播放的曲目...**"
        );
      if (!args[0].value)
        return client.sendTime(
          interaction,
          `🔉 | 目前音量 \`${player.volume}\`.`
        );
      let vol = parseInt(args[0].value);
      if (!vol || vol < 1 || vol > 100)
        return client.sendTime(
          interaction,
          `**請選擇一個數字介於** \`1 - 100\``
        );
      player.setVolume(vol);
      client.sendTime(interaction, `🔉 | 音量設為 \`${player.volume}\``);
    },
  },
};
