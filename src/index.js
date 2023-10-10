const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]});

const {CommandKit} = require('commandkit');
const path = require('path');

app.listen(3000, () => {
	console.log("Zephybot is awake");
});

client.on("ready", async () => {
	console.log("Slash commands initialized");
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