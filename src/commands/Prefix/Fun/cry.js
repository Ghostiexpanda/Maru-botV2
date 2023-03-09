const { EmbedBuilder } = require('discord.js');

const cryGifs = [
  'https://i.imgur.com/OB50VDV.gif',
  'https://i.imgur.com/EuoGFE2.gif',
  'https://i.imgur.com/aNj3mv7.gif',
  'https://i.imgur.com/piQ9Yb0.gif',
  'https://i.imgur.com/ZMiEvse.gif'
];

module.exports = {
  config: {
    name: 'cry',
    description: 'Send a cry gif.',
    category: 'Fun',
    usage: 'cry',
    cooldown: 5,
    permissions: 'everyone',
    type: "prefix",
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false
},

  run: async (client, message, args) => {
    const cryGif = cryGifs[Math.floor(Math.random() * cryGifs.length)];
    
    const embed = new EmbedBuilder()
      .setColor('#FBCFCF')
      .setDescription(`${message.author.username} is crying. :sob:`)
      .setImage(cryGif)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}
