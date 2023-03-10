const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'uptime',
    description: 'Get the bots uptime.',
    category: 'Misc',
    usage: 'uptime',
    cooldown: 5,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false // you can delete the ownerOnly if its false
},
  run: async (client, message, args) => {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Uptime')
      .setDescription(`Bot has been online for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
      .setTimestamp();

      await message.channel.send({ embeds: [embed] });
  },
};