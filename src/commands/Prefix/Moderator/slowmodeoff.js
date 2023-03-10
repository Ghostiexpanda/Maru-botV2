const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'slowmodeoff',
    description: 'Turns off slow mode for the current channel.',
    category: 'Moderation',
    usage: 'slowmodeoff',
    cooldown: 5,
    permissions: 'ManageChannels',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["ManageChannels"],
    userPerms: ["ManageChannels"],
    ownerOnly: false
  },
  run: async (client, message, args) => {
    try {
      await message.channel.setRateLimitPerUser(0);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Slow Mode Off')
        .setDescription('Slow mode has been turned off for this channel.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
        return;
    } catch (error) {
      console.error(error);

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('An error occurred while turning off slow mode.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
        return;
    }
  },
};