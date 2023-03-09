const { commandErrors } = require("../../../assets/handler/handleWebhook");

module.exports = {
    config: {
        name: 'ping',
        aliases: ['pong'],
        cooldown: 5,
        category: 'Misc',
        usage: 'ping',
        permissions: 'everyone',
        type: 'prefix'
    },
    requirements: {
        clientPerms: ['SendMessages'],
        userPerms: ['SendMessages'],
        ownerOnly: false
    },
    status: {
        underConstructions: false
    },
    run: async (bot, interaction) => {
        try {
            const start = Date.now();
            const response = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            const end = Date.now();
            const latency = end - start;
            const botLatency = bot.ws.ping;

            await response.edit({ content: `Pong! Bot latency: ${botLatency}ms | API Latency: ${latency}ms` });
        } catch (error) {
            commandErrors('Command Error', error.message, error.stack, message.guild.id, message.guild.name, 'Ping');
        }
    }
}
