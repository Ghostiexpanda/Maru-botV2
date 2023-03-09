const { EmbedBuilder } = require("discord.js");
const { commandErrors } = require("../../../assets/handler/handleWebhook");
module.exports = {
    config: {
        name: 'avatar',
        aliases: ['av'],
        cooldown: 5,
        category: 'Misc',
        usage: `avatar`,
        permissions: 'everyone',
        type: "prefix"
    },
    requirements: {
        clientPerms: ["SendMessages"],
        userPerms: ["SendMessages"],
        ownerOnly: false // you can delete the ownerOnly if its false
    },

    // You can delete the status if the underConstructions is false
    status: {
        underConstructions: false
    },
    run: async (bot, message, args) => {

        try {

            let user = message.mentions.users.first()
            if (!user) user = message.author.id
            let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ extension: 'png', dynamic: true, size: 1024 }) : message.author.avatarURL({ extension: 'png', dynamic: true, size: 1024 });
            if (!avatar) return await message.react(bot.emotes.emojiError)

            let color = message.member.displayHexColor;
            if (color == '#000000') color = bot.colors.white;
            if (message.mentions.users.size > 0) {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setAuthor({ name: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL({ extension: 'png', dynamic: true, size: 1024 }) })
                    .setURL(user.url)
                    .setTitle(`Avatar for ${message.mentions.users.first().username}:`)
                    .setImage(`${avatar}`)
                message.channel.send({ embeds: [embed] })
            } else {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setURL(avatar.url)
                    .setTitle(`Avatar for ${message.author.username}:`)
                    .setImage(`${avatar}`)
                message.channel.send({ embeds: [embed] })
            }

        } catch (error) {
            commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'avatar');
        }

    }
}