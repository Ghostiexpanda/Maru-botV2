const { EmbedBuilder } = require("discord.js");
const { commandErrors } = require("../../../assets/handler/handleWebhook");

module.exports = {
  config: {
    name: 'lockchannel',
    aliases: ['lc'],
    cooldown: 5,
    category: 'Moderator',
    description: 'Locks a channel so messages cannot be sent',
    usage: 'lockchannel [channel]',
    permissions: 'ManageChannels',
    type: "prefix"
  },
  requirements: {
    clientPerms: ["ManageChannels"],
    userPerms: ["ManageChannels"],
    ownerOnly: false
  },

  run: async (client, message, args) => {
    try {
        const channel = message.mentions.channels.first() || message.channel;
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: false,
            AddReactions: false
        })

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle(`Channel locked successfully!`)
        .addFields({ name: '📘┆Channel', value: `${channel} (${channel.name})` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'lockchannel');
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(`An error occurred while executing the command: ${error.name}`)
        .setDescription(`${error.message}`)
      await message.channel.send({ embeds: [embed] });
    }
  }
}
