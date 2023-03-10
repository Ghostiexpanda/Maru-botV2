const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'deleterole',
    description: 'Deletes the specified role from the server.',
    category: 'Moderator',
    usage: 'deleterole <role>',
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
    const roleName = args.join(' ');

    if (!roleName) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide a role to delete.')
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
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
    } else {
      try {
        await role.delete();

        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Success')
          .setDescription(`Role ${roleName} has been deleted.`)
          .setTimestamp();

        await message.channel.send({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('An error occurred while deleting the role.')
          .setTimestamp();

        await message.channel.send({ embeds: [embed] });
      }
    }
  },
};
