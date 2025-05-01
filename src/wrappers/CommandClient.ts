import { Client, Collection } from "discord.js";
import { Command } from "./types/Command";

export class CommandClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public commandList: object[] = [];
}
