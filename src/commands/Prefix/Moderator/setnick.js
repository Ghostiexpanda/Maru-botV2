const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
      name: 'setnick',
      description: 'Changes the nickname of a user.',
      category: 'Moderation',
      usage: 'setnick <user> <nickname>',
      cooldown: 5,
      permissions: 'ManageChannels',
      type: 'prefix',
    },
    requirements: {
        clientPerms: ["ManageChannels"],
        userPerms: ["ManageChannels"],
        ownerOnly: false
      },
    run: async (client, message, args) => {
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      const newNickname = args.slice(1).join(' ');
  
      if (!user) {
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('Please mention a user or provide their ID.')
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
          return;
      }
  
      if (!newNickname) {
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('Please specify a new nickname.')
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
          return;
      }
  
      try {
        await user.setNickname(newNickname);
  
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Success')
          .setDescription(`Changed ${user}'s nickname to ${newNickname}.`)
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
          return;
      } catch (error) {
        console.error(error);
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('An error occurred while changing the nickname.')
          .setTimestamp();
  
          await message.channel.send({ embeds: [embed] });
          return;
      }
    },
  };