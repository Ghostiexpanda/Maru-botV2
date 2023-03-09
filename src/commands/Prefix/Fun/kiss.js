const { EmbedBuilder } = require('discord.js');

const kisses = [
  "https://i.imgur.com/i1PIph3.gif",
  "https://i.imgur.com/WVSwvm6.gif",
  "https://i.imgur.com/sZhtvBR.gif",
  "https://i.imgur.com/q340AoA.gif",
  "https://i.imgur.com/o9MMMeW.gif",
  "https://i.imgur.com/OjTBV8G.gif"
];

module.exports = {
  config: {
    name: 'kiss',
    description: 'Send a kiss to someone special!',
    category: 'Fun',
    usage: 'kiss <@user>',
    permissions: 'everyone',
    type: "prefix",
    cooldown: 3,
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false // you can delete the ownerOnly if its false
  },

  run: async (bot, message, args) => {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to kiss!');
    }

    const randomKiss = kisses[Math.floor(Math.random() * kisses.length)];

    const embed = new EmbedBuilder()
      .setColor('#FBCFCF')
      .setTitle(`💋 Aww, ${message.author.username} kissed you!`)
      .setDescription(`${user.username}, ${message.author.username} just gave you a kiss!`)
      .setImage(randomKiss)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
