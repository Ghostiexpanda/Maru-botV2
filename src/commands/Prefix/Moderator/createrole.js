const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'createrole',
    description: 'Creates a new role with the specified name and color.',
    category: 'Moderator',
    usage: 'createrole <name> <color>',
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
    const roleName = args[0];
    const roleColor = args[1];

    if (!roleName || !roleColor) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide a name and color for the new role.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }

    try {
      const role = await message.guild.roles.create({
        name: roleName,
        color: roleColor,
      });

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Success')
        .setDescription(`Role ${role} has been created.`)
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('An error occurred while creating the role.')
        .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
  },
};