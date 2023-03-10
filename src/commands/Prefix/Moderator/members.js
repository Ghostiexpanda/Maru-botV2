const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'members',
    description: 'Displays the number of members in the current server.',
    category: 'Moderator',
    usage: 'members',
    cooldown: 5,
    permissions: 'BanMembers',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["BanMembers"],
    userPerms: ["BanMembers"],
    ownerOnly: false // you can delete the ownerOnly if its false
},
  run: async (client, message, args) => {
    const membersCount = message.guild.memberCount;

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Server Members')
      .setDescription(`There are currently ${membersCount} members in this server.`)
      .setTimestamp();

      await message.channel.send({ embeds: [embed] });
  },
};