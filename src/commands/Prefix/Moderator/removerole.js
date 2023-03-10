const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'removerole',
    description: 'Removes the specified role from the mentioned user.',
    category: 'Moderator',
    usage: 'removerole <user> <role>',
    cooldown: 5,
    permissions: 'ManageRoles',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["ManageRoles"],
    userPerms: ["ManageRoles"],
    ownerOnly: false
},
  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    const roleName = args.slice(1).join(' ');

    if (!user || !roleName) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please mention a user and provide a role to remove.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
        return;
    }

    const role = message.guild.roles.cache.find(
      (role) => role.name === roleName
    );

    if (!role) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription(`Role ${roleName} not found.`)
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
        return;
    }

    if (!user.roles) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('User does not have any roles.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
        return;
    }

    try {
      await user.roles.remove(role);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Success')
        .setDescription(`Role ${roleName} has been removed from ${user.user.tag}.`)
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('An error occurred while removing the role.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
  },
};
