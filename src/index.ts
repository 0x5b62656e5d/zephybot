import { Client, GatewayIntentBits, Partials } from "discord.js";
import { CommandKit } from "commandkit";
import { config as dotenv } from "dotenv";
import fs from 'fs';
import path from "path";

dotenv({ path: path.join(__dirname, "..", ".env") });

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Channel]
});

client.on("ready", async () => {
    console.log("Zephybot is awake :>");
});

new CommandKit({
    client,
    commandsPath: path.join(__dirname, "commands"),
    eventsPath: path.join(__dirname, "events"),
    devGuildIds: [process.env.DEV_GUILD_ID as string],
    devUserIds: [process.env.DEV_USER_ID as string],
    skipBuiltInValidations: true,
    bulkRegister: true,
});

const commands = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
const commandsList = [];
for (const file of commands) {
    commandsList.push(file.split('.')[0]);
}

client.login(process.env.TOKEN);

export { commandsList };