import { createLogName, loadLogger } from "../util/logger";
import { readFileSync, existsSync, unlinkSync } from "fs";
import path from "path";

beforeAll(async () => {
    const logFile = path.resolve(__dirname, "../../logs", createLogName());

    if (existsSync(logFile)) {
        unlinkSync(logFile)
    }

    loadLogger();

    await new Promise(resolve => setTimeout(resolve, 100));
});

afterAll(() => {
    const logFile = path.resolve(__dirname, "../../logs", createLogName());

    if (existsSync(logFile)) {
        unlinkSync(logFile);
    }
});

describe("Logger tests", () => {
    test("Logger methods exist", () => {
        expect(console.log).toBeDefined();
        expect(console.info).toBeDefined();
        expect(console.warn).toBeDefined();
        expect(console.error).toBeDefined();
    });

    test("Log directory exists", () => {
        expect(existsSync(path.resolve(__dirname, "../../logs"))).toBe(true);
    });

    test("Log file is created", async () => {
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(existsSync(path.resolve(__dirname, "../../logs", createLogName()))).toBe(true);
    });

    test("Log output format is correct", async () => {
        console.log("Test log");
        console.info("Test info");
        console.warn("Test warn");
        console.error("Test error");

        await new Promise(resolve => setTimeout(resolve, 100));

        const logFile = path.resolve(__dirname, "../../logs", createLogName());
        const lines = readFileSync(logFile, "utf-8").split(/\r?\n/);

        for (let i = 0; i < 4; i++) {
            expect(lines[i]).toMatch(
                /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[(LOG|INFO|WARN|ERROR)\] Test (log|info|warn|error)$/
            );
        }
    });
});
