const mysql = require('mysql');
const { EmbedBuilder } = require('discord.js');
const { commandErrors } = require('../../../assets/handler/handleWebhook');

module.exports = {
  config: {
    name: 'warnings',
    aliases: ['warns'],
    cooldown: 5,
    category: 'Moderator',
    description: 'Displays the warnings of a user',
    usage: 'warnings <user>',
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

      // Get the target user's ID
      const target = message.mentions.users.first() || message.author;

      // Create a connection to the MySQL database
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'discordbot'
      });

      // Connect to the database
      connection.connect();

      // Get the warnings for the target user on the current server
      let sql = `SELECT * FROM warns WHERE user_id = '${target.id}' AND server_id = '${message.guild.id}'`;
      connection.query(sql, (error, results) => {
        if (error) {
          throw error;
        }

        // If the user has no warnings on this server, send a message indicating that
        if (results.length === 0) {
          const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`${target.tag} has no warnings on this server.`);

          return message.channel.send({ embeds: [embed] });
        }

        // Create an array of fields for the embed
        const fields = results.map((warning) => {
          const warningNumber = warning.number;
          const moderator = message.guild.members.cache.get(warning.moderator_id) || warning.moderator_id;
          const reason = warning.reason;
          const date = new Date(warning.date).toLocaleDateString();

          return {
            name: `Warning #${warningNumber} | Moderator: ${moderator.user ? moderator.user.tag : moderator}`,
            value: `Reason: ${reason}\nDate: ${date}`,
            inline: false
          };
        });

        // Create the embed
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle(`${target.tag}'s warnings on this server`)
          .addFields(fields);

        // Send the embed
        message.channel.send({ embeds: [embed] });
      });

      // Close the database connection
      connection.end();
    } catch (error) {
      commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'warnings');
    }
  }
}
