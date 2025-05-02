import { Collection, GatewayIntentBits, Partials } from "discord.js";
import { config as dotenv } from "dotenv";
import path from "path";
import { CommandClient } from "./wrappers/CommandClient";
import { loadCommandsRecursively, loadEventsRecursively } from "./util/load";
import { registerCommands } from "./util/registerCommands";

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

client.login(process.env.TOKEN);
