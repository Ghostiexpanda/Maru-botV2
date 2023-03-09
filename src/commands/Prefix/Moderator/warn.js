const mysql = require('mysql');
const { commandErrors } = require('../../../assets/handler/handleWebhook');

module.exports = {
  config: {
    name: 'warn',
    aliases: [],
    cooldown: 5,
    category: 'Moderator',
    usage: 'warn <user> <reason>',
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

      // Get the target user and reason for the warn
      const target = message.mentions.users.first();
      const reason = args.slice(1).join(' ');

      // Check if the target user was mentioned
      if (!target) {
        return message.reply('Please mention a user to warn.');
      }

      // Check if the reason for the warn was provided
      if (!reason) {
        return message.reply('Please provide a reason for the warn.');
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

      // Get the current number of warnings for the target user in the current server
      let sql = `SELECT COUNT(*) as count FROM warns WHERE user_id = '${target.id}' AND server_id = '${message.guild.id}'`;
      connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        }

        // Calculate the next warning number for the user
        const warningNumber = results[0].count + 1;

        // Insert the new warn into the warns table
        sql = `INSERT INTO warns (user_id, moderator_id, reason, date, number, server_id) VALUES ('${target.id}', '${message.author.id}', '${reason}', NOW(), ${warningNumber}, '${message.guild.id}')`;
        connection.query(sql, (error, results) => {
          if (error) {
            throw error;
          }
          console.log(`Inserted ${results.affectedRows} row(s) into the warns table.`);
        });

        // Close the database connection
        connection.end();

        // Send a confirmation message
        message.channel.send(`Warned ${target.tag} for ${reason} (Warning #${warningNumber}).`);
      });
    } catch (error) {
      commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'warn');
    }
  }
}
