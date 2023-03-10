const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
      name: 'addrole',
      description: 'Adds the specified role to the mentioned user.',
      category: 'Moderator',
      usage: 'addrole <user> <role>',
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
          .setDescription('Please mention a user and provide a role to add.')
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
          return; // add this line to exit the function
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
        return; // add this line to exit the function
      }
  
      try {
        if (!user.roles) return; // add this line to check if the user has roles
        await user.roles.add(role);
  
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Success')
          .setDescription(`Role ${roleName} has been added to ${user.user.tag}.`)
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('An error occurred while adding the role.')
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
      }
    },
};
