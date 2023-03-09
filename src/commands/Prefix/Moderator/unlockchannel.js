const { EmbedBuilder } = require("discord.js");
const { commandErrors } = require("../../../assets/handler/handleWebhook");

module.exports = {
    config: {
        name: 'unlockchannel',
        aliases: ['uc'],
        cooldown: 5,
        category: 'Moderator',
        description: 'Unlocks a channel so messages can be sent',
        usage: 'unlockchannel [channel]',
        permissions: 'ManageChannels',
        type: "prefix"
    },
    requirements: {
        clientPerms: ["ManageChannels"],
        userPerms: ["ManageChannels"],
        ownerOnly: false
    },

    run: async (bot, message, args) => {
        try {
            const channel = message.mentions.channels.first() || message.channel;
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: true,
                AddReactions: true
            })
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle(`Channel unlocked successfully!`)
                .addFields(
                    { name: `📘┆Channel`, value: `${channel} (${channel.name})`, inline: true }
                );

            await message.reply({ embeds: [embed] });
        } catch (error) {
            commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'unlockchannel');
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle(`An error occurred while executing the command: ${error.name}`)
                .setDescription(`${error.message}`);
            await message.channel.send({ embeds: [embed] });
        }
    }
}
