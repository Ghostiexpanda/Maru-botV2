module.exports = {
  config: {
    name: 'ban',
    description: 'Ban a user from the server.',
    usage: 'ban <user> [reason]',
    category: 'Moderator',
    cooldown: 10,
    permissions: ['BanMembers'],
    type: "prefix",
  },
  requirements: {
    clientPerms: ["BanMembers"],
    userPerms: ["BanMembers"],
    ownerOnly: false
  },

  run: async (bot, message, args) => {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'No reason provided.';

    if (!member) {
      return message.reply('Please mention the user you want to ban!');
    }

    if (!member.bannable) {
      return message.reply('I cannot ban this user!');
    }

    // Check if user is a member of the current server
    if (!member.guild.id === message.guild.id) {
      return message.reply('This user is not a member of this server!');
    }

    try {
      await member.ban({ reason });
      message.reply(`${member.user.tag} has been banned from the server by ${message.author.tag} for the following reason: ${reason}.`);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while trying to ban the user!');
    }
  }
};
