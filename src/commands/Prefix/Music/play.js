const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { QueryType, Player } = require('discord-player');

module.exports = {
  config: {
    name: 'play',
    aliases: ['p'],
    cooldown: 3,
    category: 'Music',
    usage: 'play <song>',
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ['SendMessages'],
    userPerms: ['SendMessages'],
    ownerOnly: false
  },
  status: {
    underConstructions: true
},
  run: async (bot, message, args) => {
    try {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.reply('You need to be in a voice channel to use this command.');
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      Player.createQueue(message.guild, {
        volume: 50,
        leaveOnEnd: false,
        leaveOnStop: false,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 300000,
        autoSelfDeaf: true,
        spotifyBridge: true,
        ytdlOptions: {
            filter: "audioonly",
            opusEncoded: true,
            quality: "highestaudio",
            highWaterMark: 1 << 30,
        },
        metadata: {
            channel: message.channel,
        },
    });

      const song = args.join(' ');
      const track = await player.searchTracks(song, {
        requestedBy: message.author,
      });

      if (!track || !track.tracks.length) {
        return message.reply('No results were found.');
      }

      const resource = createAudioResource(track.tracks[0].url);

      queue.addTrack(resource, track.tracks[0], message.author);

      if (!queue.playing) {
        queue.play();
      }

      await message.channel.send(`🎶 Now playing: **${track.tracks[0].title}**`);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while processing this command.');
    }
  },
};

