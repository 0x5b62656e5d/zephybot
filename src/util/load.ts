import fs from "fs";
import path from "path";
import { CommandClient } from "../wrappers/CommandClient";

function loadEventsRecursively(client: CommandClient, directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            loadEventsRecursively(client, fullPath);
        } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))) {
            const event = require(fullPath);
            if ("name" in event && "execute" in event) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            } else {
                console.warn(
                    `[WARNING] Event at ${fullPath} is missing a required "name" or "execute" property.`
                );
            }
        }
    }
}

function loadCommandsRecursively(client: CommandClient, directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            loadCommandsRecursively(client, entryPath);
        } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))) {
            const command = require(entryPath);

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
                client.commandList.push(command.data.toJSON());
                console.log(typeof command.data.toJSON());
            } else {
                console.warn(
                    `[WARNING] The command at ${entryPath} is missing a required "data" or "execute" property.`
                );
            }
        }
    }
}

export { loadEventsRecursively, loadCommandsRecursively };
