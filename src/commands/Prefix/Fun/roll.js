const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'roll',
    description: 'Roll a dice',
    category: 'Fun',
    usage: 'roll',
    cooldown: 5,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ['SendMessages'],
    userPerms: ['SendMessages'],
    ownerOnly: false,
  },
  run: async (client, message, args) => {
    const roll = Math.floor(Math.random() * 6) + 1;

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Dice Roll')
      .setDescription(`You rolled ${roll}`)
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
