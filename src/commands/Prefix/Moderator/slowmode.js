const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'slowmode',
    description: 'Sets the slow mode for a channel.',
    category: 'Moderation',
    usage: 'slowmode <time>',
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
    const time = parseInt(args[0]);

    if (isNaN(time) || time < 0 || time > 21600) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Invalid time. Please enter a number between 0 and 21600 (seconds).')
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
      return;
    }

    try {
      await message.channel.setRateLimitPerUser(time);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Slow Mode Set')
        .setDescription(`Slow mode has been set to ${time} seconds in this channel.`)
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('An error occurred while setting the slow mode.')
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    }
  },
};
