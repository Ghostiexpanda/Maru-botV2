const { readdirSync } = require("fs")
module.exports = async (bot) => {
    console.log("[i] Prefix Command Handler:".blue);

    const load = dirs => {
        const commands = readdirSync(`./src/commands/prefix/${dirs}/`).filter(d => d.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../../commands/prefix/${dirs}/${file}`);
            console.log(`Loading prefix command ${file}`.green)
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        };
    };
    ["Misc", "private", "Moderator", "Fun", "Music"].forEach(x => load(x));

};