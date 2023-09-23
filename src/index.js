const express = require("express");
const app = express();
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]});
const {REST, Routes} = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async() => {
	try {
		const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
		console.log(`Error: ${error}`);
    }
})();

client.on("interactionCreate", interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.commandName;
});

client.login(process.env.TOKEN);

const fs = require("fs");
const prefix = "?";
client.commands = new Discord.Collection();
const commands2 = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
const commandslist = [];
for (file of commands2) {
	const commandName = file.split(".")[0];
	commandslist.push(commandName);
}
console.log(commandslist);

// client.on("messageCreate", message => {
// 	if (message.content.startsWith(prefix)) {
// 		const args = message.content.slice(prefix.length).trim().split(/ +/g);
// 		const commandName = args.shift();
// 		const command = client.commands.get(commandName);
// 		if (!command) {
// 			return;
// 		}
// 		command.run(client, message, args);
// 	}
// });