const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("node:fs");
const yaml = require("js-yaml");
const colors = require("colors");
const mysql = require('mysql')
const { Player } = require("discord-player");

if (!fs.existsSync("config.yml")) {
  return console.error("[Aborted] Unable to find config.yml file. Please copy the default configuration into a file named config.yml in the root directory. (The same directory as package.json)");
}

const configFile = yaml.load(fs.readFileSync("config.yml"));

global.config = {
  token: configFile.botToken ?? "",
  botId: configFile.clientId ?? ""
}

if (!global.config.token || global.config.token === "") return console.error("[Aborted] Please supply a bot token in your configuration file.".red);
if (!global.config.botId || global.config.botId === "") return console.error("[Aborted] Please supply a client ID in your configuration file.".red);

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: "fishy",
      type: 0
    }],
    status: 'dnd'
  }
});

// Create a new instance of the Player class
bot.player = new Player(bot);
if (!bot.cooldowns) bot.cooldowns = new Map();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'discordbot'
});

connection.connect((error) => {
  if (error) {
    console.error(`Error connecting to database: ${error}`);
  } else {
    console.log('Connected to database!');
  }
});

connection.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error(`Error executing query: ${error}`);
  } else {
    console.log(`Query results: ${JSON.stringify(results)}`);
  }
});

connection.end();


bot.slash_commands = new Collection();
bot.buttons = new Collection();

bot.cfg = require('./config/cfg');
bot.emotes = bot.cfg.emojis;
bot.discord = bot.cfg.discord;
bot.system = bot.cfg.system;
bot.colors = bot.cfg.colors;

const errorHandler = require('./src/assets/handler/handleErrors');
const { botErrors } = require("./src/assets/handler/handleWebhook");

bot.on("disconnect", errorHandler.disconnect)
  .on("reconnecting", errorHandler.reconnecting)
  .on("warn", errorHandler.warn)
  .on("error", errorHandler.error)
  .on("shardError", errorHandler.DiscordAPIError);

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  const errorMessage = err.message || 'Unknown error occurred.';
  const stackTrace = err.stack || 'No stack trace available.';
  botErrors('Unhandled Rejection', errorMessage, stackTrace)
});


const functions = fs.readdirSync("./src/assets/functions").filter((file) => file.endsWith(".js"));

['aliases', 'commands'].forEach(x => bot[x] = new Collection());
['handlePrefix'].forEach(x => require(`./src/assets/handler/${x}`)(bot));


(async () => {
  for (var file of functions) {
    require(`./src/assets/functions/${file}`)(bot);
  }
  bot.handleSlahCommands();
  bot.handleEvents();
  bot.handleButtons();
  bot.login(global.config.token);
})();