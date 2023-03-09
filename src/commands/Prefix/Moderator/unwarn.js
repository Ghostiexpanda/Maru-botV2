const mysql = require('mysql');
const { commandErrors } = require('../../../assets/handler/handleWebhook');

module.exports = {
  config: {
    name: 'unwarn',
    aliases: ['remove-warn'],
    cooldown: 5,
    category: 'Moderator',
    usage: 'unwarn <user> <number>',
    permissions: 'ManageMessages',
    type: 'prefix'
  },
  requirements: {
    clientPerms: ['SendMessages', 'EmbedLinks'],
    userPerms: ['ManageMessages'],
    ownerOnly: false
  },
  run: async (bot, message, args) => {
    try {
      // Check if the user has the required permissions to use the command
      if (!message.member.permissions.has('ManageMessages')) {
        return message.reply('You do not have permission to use this command.');
      }

      // Get the target user and warn number
      const target = message.mentions.users.first();
      const warnNumber = parseInt(args[1]);

      // Check if the target user was mentioned
      if (!target) {
        return message.reply('Please mention a user to remove a warning from.');
      }

      // Check if a valid warn number was provided
      if (isNaN(warnNumber)) {
        return message.reply('Please provide a valid warning number to remove.');
      }

      // Create a connection to the MySQL database
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'discordbot'
      });

      // Connect to the database
      connection.connect();

      // Delete the specified warn from the database for the current server
      const sql = `DELETE FROM warns WHERE user_id = ${target.id} AND number = ${warnNumber} AND server_id = ${message.guild.id}`;
      connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        }

        // Check if a warn was removed from the database
        if (results.affectedRows === 0) {
          return message.reply(`Could not find warning number ${warnNumber} for ${target.tag}.`);
        }

        console.log(`Removed ${results.affectedRows} row(s) from the warns table.`);

        // Send a confirmation message
        message.channel.send(`Removed warning number ${warnNumber} for ${target.tag}.`);
      });

      // Close the database connection
      connection.end();

    } catch (error) {
      commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'unwarn');
    }
  }
}
