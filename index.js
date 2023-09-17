const express = require("express");
const app = express();
require("dotenv").config();

app.listen(3000, () => {
	console.log("Zephybot is awake");
});

app.get("/", (req, res) => {
	res.send("Hello world");
});

const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]});

const fs = require("fs");
const prefix = "?";
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (file of commands) {
	const commandName = file.split(".")[0];
	const command = require(`./Commands/${commandName}`);
	client.commands.set(commandName, command);
}

client.on("messageCreate", message => {
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		// const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift();
		const command = client.commands.get(commandName);
		if (!command) {
			return;
		}
		command.run(client, message, args);
	}
});

client.login(process.env.token);