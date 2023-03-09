module.exports = {
    config: {
      name: 'kick',
      description: 'Kick a user from the server.',
      usage: 'kick <@user> [reason]',
      category: 'Moderator',
      cooldown: 5,
      permissions: ['KickMembers'],
      type: "prefix",
    },
    requirements: {
        clientPerms: ["KickMembers"],
        userPerms: ["KickMembers"],
        ownerOnly: false
    },
  
    run: async (client, message, args) => {
      const { member, mentions } = message;
      const target = mentions.members.first();
  
      if (!target) {
        return message.reply('Please specify someone to kick.');
      }
  
      if (target.id === message.author.id) {
        return message.reply('You cannot kick yourself!');
      }
  
      if (target.id === client.user.id) {
        return message.reply('I cannot kick myself!');
      }
  
      const reason = args.slice(1).join(' ') || 'No reason provided';
  
      try {
        await target.kick(reason);
        message.channel.send(`Successfully kicked ${target.user.tag}.`);
      } catch (error) {
        console.error(error);
        message.reply('There was an error trying to kick the specified member.');
      }
    }
  }
  