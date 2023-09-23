const express = require("express");
const app = express();
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

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'Commands'),
    devGuildIds: ['1064736062125113485'],
    devUserIds: ['936640230272942091'],
});

client.login(process.env.TOKEN);