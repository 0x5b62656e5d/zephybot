import { createStream } from "rotating-file-stream";
import config from "./config";

const createLogName = () => {
    const date = new Date();
    const month: string = (date.getMonth() + 1).toString();
    const day: string = date.getDate().toString();

    return `${process.env.JEST_WORKER_ID ? `${process.env.JEST_WORKER_ID}test-` : ""}${date.getFullYear()}-${month.length == 1 ? `0${month}` : month}-${
        day.length == 1 ? `0${day}` : day
    }.log`;
};

const logStream = createStream(createLogName(), {
    interval: "1d",
    path: config.database.path,
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
