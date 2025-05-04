import { existsSync, readdirSync, rmdirSync } from "fs";
import path from "path";

const logDir = path.join(__dirname, "../../logs");

if (existsSync(logDir)) {
    const files = readdirSync(logDir);

    if (files.length === 0) {
        rmdirSync(logDir);
    }
}
