module.exports = {
    name: "ready",
    once: true,
    async execute(bot) {
        console.log(`Logged in as ${bot.user.username}. Ready on ${bot.guilds.cache.size} servers, for total of ${bot.users.cache.size} users!`)
    }
};