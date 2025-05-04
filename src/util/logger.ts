import fs from "fs";
import path from "path";
import { createStream } from "rotating-file-stream";

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const createLogName = () => {
    const date = new Date();
    const month: string = (date.getMonth() + 1).toString();
    const day: string = date.getDate().toString();

    return `${date.getFullYear()}-${month.length == 1 ? `0${month}` : month}-${
        day.length == 1 ? `0${day}` : day
    }.log`;
};

const logStream = createStream(createLogName(), {
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
        original(`[${method.toUpperCase()}]`, ...args);
    };
};

const loadLogger = () => {
    wrapConsoleMethod("log");
    wrapConsoleMethod("info");
    wrapConsoleMethod("warn");
    wrapConsoleMethod("error");
};

export { loadLogger, createLogName };
