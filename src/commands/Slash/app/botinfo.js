const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { formatNumber, embedURL } = require("../../../assets/utils/utils")
const { dependencies } = require('../../../../package.json');

const moment = require('moment');

const { commandErrors } = require('../../../assets/handler/handleWebhook');
const djsversion = "14.7.1"

module.exports = {
    config: {
        name: "botinfo",
        category: "app",
        description: "Retrieves information about the bot, such as its name, version, and description. This allows users to learn more about the bot's purpose and features.",
        usage: "botinfo",
        type: "slash", // or "slash"
        cooldown: 5
    },
    status: {
        underConstructions: true
    },
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Use the \`botinfo\` command to get more information about this bot'),

    async execute(interaction, bot) {

        try {
            const duration = moment.duration(bot.uptime);
            const embed = new EmbedBuilder()
                .setColor(bot.colors.embedColor)
                .setAuthor({ name: bot.discord.botusername, iconURL: bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) })
                .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setFooter({ text: `©2023 ${bot.discord.botusername} by ScaredGhost#4534`, iconURL: bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) })
                .setDescription(`Bot thingy lol [${bot.discord.ownerName}](https://discord.com/users/${bot.discord.OwnerID}).\nJust a bot oop`)
                .addFields(
                    { name: `❯ Servers`, value: `${formatNumber(bot.guilds.cache.size)}`, inline: true },
                    { name: `❯ Commands`, value: `${formatNumber(bot.commands.size)}`, inline: true },
                    { name: `❯ Channels`, value: `${formatNumber(bot.channels.cache.size)}`, inline: true },
                    { name: `❯ Users`, value: `${formatNumber(bot.users.cache.size)}`, inline: true },
                    { name: `❯ Shards`, value: `${formatNumber(bot.options.shardCount)}`, inline: true },
                    { name: `❯ Node.js`, value: `${process.version}`, inline: true },
                    { name: `❯ Discord.js`, value: `v${djsversion}`, inline: true },
                    { name: `❯ Uptime`, value: `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`, inline: true },
                    { name: `❯ Memory`, value: `${formatNumber((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))}MBS/8000MBS`, inline: true },
                    { name: `❯ Dependencies`, value: `${Object.keys(dependencies).join(', ')}`, inline: true }
                )

            const inviteButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(bot.discord.botInviteLink)
                .setLabel('Invite Bot')

            const supportButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(bot.discord.supportServer)
                .setLabel('Support Server')

            const buttonRow = new ActionRowBuilder().addComponents(inviteButton, supportButton)
            interaction.reply({ embeds: [embed], components: [buttonRow] })
        } catch (error) {
            commandErrors('Command Error', error.message, error.stack, interaction.guild.id, interaction.guild.name, 'botinfo');
        }
    }
};