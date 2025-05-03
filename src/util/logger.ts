import fs from "fs";
import path from "path";
import rfs from "rotating-file-stream";

const logDir = path.resolve(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logStream = rfs.createStream("output.log", {
    interval: "1d",
    path: logDir,
    maxFiles: 7,
});

const wrapConsoleMethod = (method: "log" | "info" | "warn" | "error") => {
    const original = console[method].bind(console);

    console[method] = (...args: any[]) => {
        const output = args
            .map(arg => (typeof arg === "string" ? arg : JSON.stringify(arg)))
            .join(" ");

        const timestamp = new Date().toISOString();
        logStream.write(`[${timestamp}] [${method.toUpperCase()}] ${output}\n`);
        original(...args);
    };
};

export const loadLogger = () => {
    wrapConsoleMethod("log");
    wrapConsoleMethod("info");
    wrapConsoleMethod("warn");
    wrapConsoleMethod("error");
};
