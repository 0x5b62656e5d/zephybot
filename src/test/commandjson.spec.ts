import config from "../util/config";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { getFileBaseName } from "../util/filebasename";

const commandsDir = path.resolve(process.cwd(), "src", "commands");
const commandsList: string[] = [];

const getCommands = (dir: string) => {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            getCommands(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))) {
            commandsList.push(getFileBaseName(entry.name));
        }
    }
};

getCommands(commandsDir);

test("Comands JSON file structure", () => {
    for (const commandName of commandsList) {
        expect(config.bot.commands.COMMAND_MAP[commandName]).toBeDefined();
        expect(config.bot.commands.COMMAND_MAP[commandName].name).toBeDefined();
        expect(config.bot.commands.COMMAND_MAP[commandName].description).toBeDefined();
        expect(config.bot.commands.COMMAND_MAP[commandName].options).toBeDefined();
    }
});
