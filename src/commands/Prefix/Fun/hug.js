const { EmbedBuilder } = require('discord.js');

const hugs = [
    "https://i.imgur.com/r9aU2xv.gif",
    "https://i.imgur.com/BPLqSJC.gif",
    "https://i.imgur.com/ntqYLGl.gif",
    "https://i.imgur.com/4oLIrwj.gif",
    "https://i.imgur.com/TQZ7YJO.gif",
    "https://i.imgur.com/8odqc1d.gif"
  ];

module.exports = {
config: {
    name: 'hug',
    description: 'Send a hug to someone special!',
    category: 'Fun',
    usage: 'hug <@user>',
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
      return message.reply('You need to mention a user to hug!');
    }

    const randomHug = hugs[Math.floor(Math.random() * hugs.length)];
    
    const embed = new EmbedBuilder()
      .setColor('#FBCFCF')
      .setTitle(`Aww, ${message.author.username} hugged you!`)
      .setDescription(`${user.username}, ${message.author.username} just gave you a hug!`)
      .setImage(randomHug)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
