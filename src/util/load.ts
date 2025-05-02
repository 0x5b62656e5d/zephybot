import fs from "fs";
import path from "path";
import { CommandClient } from "../wrappers/CommandClient";
import Database, { type Database as DatabaseType } from "better-sqlite3";

const loadEventsRecursively = (client: CommandClient, directory: string) => {
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
                console.info(`[INFO] Loaded event: ${event.name}`);
            } else {
                console.warn(
                    `[WARNING] Event at ${fullPath} is missing a required "name" or "execute" property.`
                );
            }
        }
    }
};

const loadCommandsRecursively = (client: CommandClient, directory: string) => {
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
                console.info(`[INFO] Loaded command: ${command.data.name}`);
            } else {
                console.warn(
                    `[WARNING] The command at ${entryPath} is missing a required "data" or "execute" property.`
                );
            }
        }
    }
};

const loadDatabase = (): DatabaseType => {
    const db = new Database("data/database.sqlite");

    db.exec(`
        CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash TEXT NOT NULL UNIQUE,
            messageId TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            description TEXT NOT NULL
        );
    `);

    const exists = db
        .prepare(`SELECT 1 FROM todo WHERE hash = ? AND messageId = ?`)
        .get("testhash", "12345");
    if (!exists) {
        db.prepare(
            `INSERT INTO todo (hash, messageId, title, description) VALUES (?, ?, ?, ?)`
        ).run("testhash", "12345", "Test", "Test description");
    }

    const rows = db.prepare(`SELECT * FROM todo`).all();

    console.info("[INFO] Todo database loaded:");
    for (const row of rows) {
        console.info(row);
    }

    return db;
};

export { loadCommandsRecursively, loadDatabase, loadEventsRecursively };
