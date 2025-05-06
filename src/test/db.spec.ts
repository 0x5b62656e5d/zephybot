import { type Database as DatabaseType } from "better-sqlite3";
import { existsSync, unlinkSync } from "fs";
import { TodoDatabase } from "../wrappers/types/TodoDatabase";
import config from "../util/config";

((database: DatabaseType) => {
    console.log(typeof database);
    const exists = database
        .prepare(`SELECT 1 FROM todo WHERE hash = ? AND messageId = ?`)
        .get("testhash", "12345");
    if (!exists) {
        database
            .prepare(`INSERT INTO todo (hash, messageId, title, description) VALUES (?, ?, ?, ?)`)
            .run("testhash", "12345", "Test", "Test description");
    }
})(config.database.database);

describe("Database tests", () => {
    test("Database connection", () => {
        expect(config.database).toBeDefined();
    });

    test("Database table creation", () => {
        const exists = config.database.database
            .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='todo'`)
            .get();
        expect(exists).toBeDefined();
    });

    test("Database row insertion", () => {
        const exists = config.database.database
            .prepare(`SELECT 1 FROM todo WHERE hash = ? AND messageId = ?`)
            .get("testhash", "12345");
        expect(exists).toBeDefined();
    });

    test("Database row retrieval", () => {
        const row = config.database.database
            .prepare(`SELECT * FROM todo WHERE hash = ? AND messageId = ?`)
            .get("testhash", "12345") as TodoDatabase;
        expect(row).toBeDefined();
        expect(row.hash).toBe("testhash");
        expect(row.messageId).toBe("12345");
        expect(row.title).toBe("Test");
        expect(row.description).toBe("Test description");
    });
});

// if (existsSync(config.database.path)) {
//     unlinkSync(config.database.path);
// }