import { Collection, GatewayIntentBits, Partials } from "discord.js";
import { config as dotenv } from "dotenv";
import path from "path";
import { CommandClient } from "./wrappers/CommandClient";
import { loadCommandsRecursively, loadEventsRecursively } from "./util/load";
import { registerCommands } from "./util/registerCommands";
import { GoogleGenAI } from "@google/genai";
import { loadLogger } from "./util/logger";
import config from "./util/config";

loadLogger();

const client = new CommandClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Channel],
});

client.commands = new Collection();

loadCommandsRecursively(client, path.join(__dirname, "commands"));
loadEventsRecursively(client, path.join(__dirname, "events"));
registerCommands(client, config.bot.TOKEN, config.bot.APPLICATION_ID);

const commandsList = client.commands.map(command => command.data.toJSON());

const gemini = new GoogleGenAI({ apiKey: config.apiKeys.GEMINI });

client.login(config.bot.TOKEN);

export { gemini, commandsList };
