module.exports = {
    config: {
      name: 'mute',
      description: 'Mute a user in the server.',
      usage: 'mute <@user> <time in minutes> [reason]',
      category: 'Moderator',
      cooldown: 5,
      permissions: ['MuteMembers'],
      type: 'prefix',
    },
    requirements: {
      clientPerms: ['MuteMembers'],
      userPerms: ['MuteMembers'],
      ownerOnly: false,
    },
  
    run: async (client, message, args) => {
      const { member, mentions } = message;
      const target = mentions.members.first();
  
      if (!target) {
        return message.reply('Please specify someone to mute.');
      }
  
      if (target.id === message.author.id) {
        return message.reply('You cannot mute yourself!');
      }
  
      if (target.id === client.user.id) {
        return message.reply('I cannot mute myself!');
      }
  
      const time = args[1];
      if (!time || isNaN(time)) {
        return message.reply('Please specify a valid time in minutes.');
      }
  
      const reason = args.slice(2).join(' ') || 'No reason provided';
  
      try {
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
          message.reply('There is no "Muted" role in this server. Please create one before using this command.');
          return;
        }
  
        await target.roles.add(muteRole);
        message.channel.send(`Successfully muted ${target.user.tag} for ${time} minutes.`);
  
        setTimeout(async () => {
          await target.roles.remove(muteRole);
          message.channel.send(`Successfully unmuted ${target.user.tag}.`);
        }, time * 60000);
      } catch (error) {
        console.error(error);
        message.reply('There was an error trying to mute the specified member.');
      }
    },
  };
  