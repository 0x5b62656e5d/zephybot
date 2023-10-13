const Discord = require("discord.js");
const fs = require("fs");
const { CommandKit } = require('commandkit');
const path = require('path');
require("dotenv").config();

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]});

client.on("ready", async () => {
	console.log("Zephybot is awake :>");
})

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./src/Commands").filter(file => file.endsWith(".js"));
commandslist = [];
for (file of commands) {
    commandslist.push(file.split(".")[0]);
}
module.exports = { commandslist };

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'Commands'),
    eventsPath: path.join(__dirname, 'events'),
    devGuildIds: ['1064736062125113485'],
    devUserIds: ['936640230272942091'],
});

client.login(process.env.TOKEN);