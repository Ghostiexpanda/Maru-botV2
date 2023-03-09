const { EmbedBuilder } = require('discord.js');

const kills = [
    "https://i.imgur.com/7et8lYx.gif",
    "https://i.imgur.com/Y9FsSXa.gif",
    "https://i.imgur.com/vUxYSTU.gif",
    "https://i.imgur.com/Tra6zBW.gif",
    "https://i.imgur.com/D30FBBu.gif",
    "https://i.imgur.com/XOYXT6u.gif"
];

module.exports = {
    config: {
        name: 'kill',
        description: 'Kill someone!',
        category: 'Fun',
        usage: 'kill <@user>',
        permissions: 'everyone',
        type: "prefix",
        cooldown: 3,
    },
    requirements: {
        clientPerms: ["SendMessages"],
        userPerms: ["SendMessages"],
        ownerOnly: false
    },

    run: async (bot, message, args) => {
        let user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to kill!');
        }

        const randomKill = kills[Math.floor(Math.random() * kills.length)];

        const embed = new EmbedBuilder()
            .setColor('#FBCFCF')
            .setTitle(`${message.author.username} killed ${user.username}!`)
            .setImage(randomKill)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
