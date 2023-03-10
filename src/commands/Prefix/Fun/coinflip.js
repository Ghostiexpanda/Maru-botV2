const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'coinflip',
    description: 'Flips a coin and returns either heads or tails.',
    category: 'Fun',
    usage: 'coinflip',
    cooldown: 5,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false
},
  run: async (bot, message, args) => {
    // Generate a random number to determine heads or tails
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // Create the embed for the coin flip message
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('🪙 Coin Flip 🪙')
      .setDescription(`The coin landed on **${result}**!`);

    // Send the coin flip message
    await message.channel.send({ embeds: [embed] });
  },
};