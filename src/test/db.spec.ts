import { loadDatabase } from '../util/load';
import { TodoDatabase } from '../wrappers/types/TodoDatabase';

const database = loadDatabase();

test('Database connection', () => {
    expect(database).toBeDefined();
});

test('Database table creation', () => {
    const db = database;
    const exists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='todo'`).get();
    expect(exists).toBeDefined();
});

test('Database row insertion', () => {
    const exists = database.prepare(`SELECT 1 FROM todo WHERE hash = ? AND messageId = ?`).get("testhash", "12345");
    expect(exists).toBeDefined();
});

test('Database row retrieval', () => {
    const row = database.prepare(`SELECT * FROM todo WHERE hash = ? AND messageId = ?`).get("testhash", "12345") as TodoDatabase;
    expect(row).toBeDefined();
    expect(row.hash).toBe("testhash");
    expect(row.messageId).toBe("12345");
});