const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'joindate',
    description: 'Displays the date when a user joined the server.',
    category: 'Information',
    usage: 'joindate [user]',
    cooldown: 5,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ['SendMessages', 'EmbedLinks'],
    userPerms: ['SendMessages'],
    ownerOnly: false,
  },
  run: async (client, message, args) => {
    const target = message.mentions.members.first() || message.member;
    const joinDate = target.joinedAt.toDateString();

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle(`${target.displayName}'s Join Date`)
      .setDescription(`**${joinDate}**`)
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
