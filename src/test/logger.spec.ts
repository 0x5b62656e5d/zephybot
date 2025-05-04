import { createLogName, loadLogger } from "../util/logger";
import { readFileSync, existsSync } from "fs";
import path from "path";

loadLogger();

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

    test("Log file is created", () => {
        expect(existsSync(path.resolve(__dirname, "../../logs", createLogName()))).toBe(true);
    });

    test("Log output format is correct", () => {
        const logMock = jest.spyOn(console, "log").mockImplementation();
        const infoMock = jest.spyOn(console, "info").mockImplementation();
        const warnMock = jest.spyOn(console, "warn").mockImplementation();
        const errorMock = jest.spyOn(console, "error").mockImplementation();

        console.log("Test log");
        console.info("Test info");
        console.warn("Test warn");
        console.error("Test error");

        const logFile = path.resolve(__dirname, "../../logs", createLogName());
        const lines = readFileSync(logFile, "utf-8").split(/\r?\n/);

        for (let i = 0; i < 4; i++) {
            expect(lines[i]).toMatch(
                /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[(LOG|INFO|WARN|ERROR)\] Test (log|info|warn|error)$/
            );
        }

        logMock.mockRestore();
        infoMock.mockRestore();
        warnMock.mockRestore();
        errorMock.mockRestore();
    });
});
