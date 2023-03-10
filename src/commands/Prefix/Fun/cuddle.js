const { EmbedBuilder } = require('discord.js');

const cuddles = [
  "https://i.imgur.com/r9aU2xv.gif",
  "https://i.imgur.com/BPLqSJC.gif",
  "https://i.imgur.com/ntqYLGl.gif",
  "https://i.imgur.com/4oLIrwj.gif",
  "https://i.imgur.com/TQZ7YJO.gif",
  "https://i.imgur.com/8odqc1d.gif",
  "https://i.imgur.com/1q0sfog.gif",
  "https://i.imgur.com/LqdoObW.gif",
  "https://i.imgur.com/yP3HhQw.gif",
  "https://i.imgur.com/utjE8Te.gif",
  "https://i.imgur.com/r4PZ5oy.gif",
];

module.exports = {
  config: {
    name: 'cuddle',
    description: 'Cuddle someone special!',
    category: 'Fun',
    usage: 'cuddle <@user>',
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
    let user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to cuddle!');
    }

    const randomCuddle = cuddles[Math.floor(Math.random() * cuddles.length)];
    
    const embed = new EmbedBuilder()
      .setColor('#FBCFCF')
      .setTitle(`Aww, ${message.author.username} is Cuddling you!`)
      .setDescription(`${user.username}, ${message.author.username} Is cuddling you how cute!`)
      .setImage(randomCuddle)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
