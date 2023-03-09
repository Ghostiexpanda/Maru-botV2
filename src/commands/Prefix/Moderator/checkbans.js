const { commandErrors } = require('../../../assets/handler/handleWebhook');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'bans',
    aliases: ['banlist'],
    cooldown: 5,
    category: 'Moderator',
    usage: 'bans',
    permissions: 'BanMembers',
    type: 'prefix'
  },
  requirements: {
    clientPerms: ['SendMessages', 'EmbedLinks'],
    userPerms: ['BanMembers'],
    ownerOnly: false
  },
  run: async (bot, message, args) => {
    try {
      // Check if the user has the required permissions to use the command
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
      }

      // Get the banned users from the guild
      const bans = await message.guild.bans.fetch();

      // Check if there are any banned users
      if (bans.size === 0) {
        return message.reply('There are no banned users in this server.');
      }

      // Create an array to store the banned users
      const bannedUsers = [];

      // Iterate through the banned users and add them to the array
      bans.forEach((ban) => {
        const banReason = ban.reason || 'No reason provided';
        bannedUsers.push(`- ${ban.user.tag} (${ban.user.id}) | Reason: ${banReason}`);
      });

      // Create a new embed message
      const embed = new EmbedBuilder()
        .setTitle('Banned Users')
        .setDescription(bannedUsers.join('\n'))
        .setColor('#FF0000');

      // Send the embed message
      message.channel.send({ embeds: [embed] });

    } catch (error) {
      commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'bans');
    }
  }
}
