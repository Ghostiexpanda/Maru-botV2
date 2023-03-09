const { EmbedBuilder } = require("discord.js");
const { commandErrors } = require("../../../assets/handler/handleWebhook");
module.exports = {
    config: {
        name: 'worldclock',
        aliases: ['wc'],
        cooldown: 5,
        category: 'Fun',
        usage: `worldclock <timezone>`,
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
            const timezone = args[0];
            if (!timezone) {
                return await message.channel.send("Please provide a valid timezone.");
            }
            const date = new Date().toLocaleString("en-US", {timeZone: timezone});
            const embed = new EmbedBuilder()
                .setColor(message.member.displayHexColor || bot.colors.white)
                .setTitle(`World Clock - ${timezone}`)
                .setDescription(`The current time in ${timezone} is ${date}.`)
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'worldclock');
        }

    }
}
