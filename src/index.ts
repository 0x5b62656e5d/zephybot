import { Collection, GatewayIntentBits, Partials } from "discord.js";
import { config as dotenv } from "dotenv";
import path from "path";
import { CommandClient } from "./wrappers/CommandClient";
import { loadCommandsRecursively, loadDatabase, loadEventsRecursively } from "./util/load";
import { registerCommands } from "./util/registerCommands";
import { GoogleGenAI } from "@google/genai";

dotenv({ path: path.join(__dirname, "..", ".env") });

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
registerCommands(client, process.env.TOKEN as string, process.env.APPLICATION_ID as string);

const commandsList = client.commands.map(command => command.data.toJSON());

const db = loadDatabase("data/database.sqlite");

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

client.login(process.env.TOKEN);

export { db as database, gemini, commandsList };
