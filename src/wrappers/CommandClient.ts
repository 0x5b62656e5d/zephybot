import { Client, Collection } from "discord.js";
import { SlashCommand } from "./types/SlashCommand";

export class CommandClient extends Client {
    public commands: Collection<string, SlashCommand> = new Collection();
    public commandList: object[] = [];
}
