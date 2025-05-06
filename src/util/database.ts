import Database, { Database as DatabaseType } from "better-sqlite3";
import config from "./config";
import { TodoDatabase } from "../wrappers/types/TodoDatabase";

const queryByHash = (hash: String) => {
    return config.database.database
        .prepare(`SELECT * FROM todo WHERE hash = ?`)
        .get(hash) as TodoDatabase;
};

const getAllEntries = () => {
    return config.database.database.prepare(`SELECT * FROM todo`).all() as TodoDatabase[];
};

const getEntry = (hash: string) => {
    const entry = queryByHash(hash);

    if (!entry) {
        throw new Error(`Entry with hash ${hash} not found`);
    }

    return entry;
};

const deleteEntry = (hash: string) => {
    if (!queryByHash(hash)) {
        throw new Error(`Entry with hash ${hash} not found`);
    }

    config.database.database.prepare(`DELETE FROM todo WHERE hash = ?`).run(hash);
};

const insertEntry = (hash: string, messageId: string, title: string, description: string) => {
    config.database.database
        .prepare(`INSERT INTO todo (hash, messageId, title, description) VALUES (?, ?, ?, ?)`)
        .run(hash, messageId, title, description);
};

const loadDatabase = (databasePath: string): DatabaseType => {
    const db = new Database(databasePath);

    db.exec(`
        CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash TEXT NOT NULL UNIQUE,
            messageId TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            description TEXT NOT NULL
        );
    `);

    const rows = db.prepare(`SELECT * FROM todo`).all();

    console.info("Todo database loaded:");
    for (const row of rows) {
        console.log(row);
    }

    return db;
};

export { getAllEntries, getEntry, deleteEntry, insertEntry, queryByHash, loadDatabase };
