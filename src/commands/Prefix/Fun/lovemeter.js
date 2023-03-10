const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'lovemeter',
    description: 'Check the love meter between two people!',
    category: 'Fun',
    usage: 'lovemeter <person1> <person2>',
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
    if (args.length !== 2) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide two people to check the love meter!')
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const loveMeter = Math.floor(Math.random() * 101);

    const embed = new EmbedBuilder()
      .setColor('#FFC0CB')
      .setTitle('Love Meter')
      .setDescription(`The love between ${args[0]} and ${args[1]} is ${loveMeter}% ❤️`)
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
