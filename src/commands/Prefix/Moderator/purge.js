
module.exports = {
    config: {
        name: 'purge',
        description: 'Deletes a specified number of messages from the current channel',
        category: 'Moderator',
        usage: 'purge <amount>',
        permissions: 'ManageMessages',
        type: 'prefix',
    },
    requirements: {
        clientPerms: ['ManageMessages'],
        userPerms: ['ManageMessages'],
        ownerOnly: false
      },

  run: async (client, message, args) => {
    // Check if the user has the required permissions to use the command
    if (!message.member.permissions.has('ManageMessages')) {
      return message.reply({
        content: 'You do not have permission to use this command',
        ephemeral: true,
      });
    }

    // Check if the amount of messages to delete is valid
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply({
        content: 'Please provide a number between 1 and 100',
        ephemeral: true,
      });
    }

    // Delete the messages
    try {
      const fetched = await message.channel.messages.fetch({ limit: amount });
      message.channel.bulkDelete(fetched);
      message.reply(`Deleted ${fetched.size} messages.`);
    } catch (error) {
      console.log(error);
      message.reply({
        content: 'An error occurred while trying to purge messages',
        ephemeral: true,
      });
    }
  },
};
