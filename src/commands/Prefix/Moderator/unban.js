module.exports = {
  config: {
    name: 'unban',
    description: 'Unbans a user from server',
    usage: 'unban <user ID> <reason>',
    category: 'Moderator',
    cooldown: 5,
    permissions: ['BanMembers'],
    type: 'prefix',
  },
  requirements: {
    clientPerms: ['BanMembers'],
    userPerms: ['BanMembers'],
    ownerOnly: false,
  },
  run: async (bot, message, args) => {
    const userID = args[0];
    const reason = args.slice(1).join(' ') || 'No reason provided';
    if (!userID) {
      return message.reply('Please provide a valid user ID');
    }

    try {
      // Unban the user from the server
      const bannedUser = await message.guild.members.unban(userID, reason);
      message.channel.send(`Successfully unbanned user <@${bannedUser.username}>`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while trying to unban the user');
    }
  },
};
