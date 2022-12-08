const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "啟動 張先生的屁眼YouTube派隊 模式",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **你必須先加入語音頻道!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **張先生沒有創建邀請權限**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "張先生的屁眼YouTube派隊",
        "https://github.com/oo273825/zhang-music/blob/main/YT.gif?raw=true"
      )
      .setColor("#FF0000").setDescription(`
使用 **張先生的屁眼YouTube派隊** 你可以在語音頻道中與朋友一起觀看 YouTube. 快按下 **張先生的屁眼YouTube派隊**  來加入!

__**[張先生的屁眼YouTube派隊](https://discord.com/invite/${Invite.code})**__

⚠ **備註:** 僅能再電腦上運作
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
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
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **張先生沒有創建邀請權限**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "張先生的屁眼YouTube派隊",
          "https://github.com/oo273825/zhang-music/blob/main/YT.gif?raw=true"
        )
        .setColor("#FF0000").setDescription(`
使用 **張先生的屁眼YouTube派隊** 你可以在語音頻道中與朋友一起觀看 YouTube. 快按下 **張先生的屁眼YouTube派隊**  來加入!

__**[張先生的屁眼YouTube派隊](https://discord.com/invite/${Invite.code})**__

⚠ **備註:** 僅能再電腦上運作
`);
      interaction.send(embed.toJSON());
    },
  },
};
