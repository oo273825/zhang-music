const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "seek",
  description: "尋找歌曲位置",
  usage: "<time s/m/h>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["forward"],
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
    if (!player.queue.current.isSeekable)
      return client.sendTime(
        message.channel,
        "❌ | **未找到此歌曲!**"
      );
    let SeekTo = client.ParseHumanTime(args.join(" "));
    if (!SeekTo)
      return client.sendTime(
        message.channel,
        `**用法 - **\`${GuildDB.prefix}seek <number s/m/h>\` \n**Example - **\`${GuildDB.prefix}seek 2m 10s\``
      );
    player.seek(SeekTo * 1000);
    message.react("✅");
  },
  /*
    SlashCommand: {
        options: [
            {
                name: "position",
                description: "輸入您要查找的時間戳. Example - 2m 10s",
                value: "position",
                type: 3,
                required: true,
                //**
                *
                * @param {import("../structures/DiscordMusicBot")} client
                * @param {import("discord.js").Message} message
                * @param {string[]} args
                * @param {*} param3
                *
                run: async (client, interaction, args, { GuildDB }) => {
                    const guild = client.guilds.cache.get(interaction.guild_id);
                    const member = guild.members.cache.get(interaction.member.user.id);
                    let player = await client.Manager.get(interaction.guild_id);
                    
                    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **你必須先加入語音頻道!**");
                    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**");
                    if (!player) return client.sendTime(interaction, "❌ | **現在沒有播放的曲目...**");
                    if (!player.queue.current.isSeekable) return client.sendTime(interaction, "❌ | **未找到此歌曲!**");
                    let SeekTo = client.ParseHumanTime(interaction.data.options[0].value);
                    if (!SeekTo) return client.sendTime(interaction, `**用法 - **\`${GuildDB.prefix}seek <number s/m/h>\` \n**Example -** \`${GuildDB.prefix}seek 2m 10s\``);
                    player.seek(SeekTo * 1000);
                    client.sendTime(interaction, "✅ | **成功將歌曲移至 **", `\`${Seekto}\``);
                },
            },
        ],
    },
*/
};
