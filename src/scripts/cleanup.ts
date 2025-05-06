import { existsSync, readdirSync, rmdirSync, rmSync } from "fs";
import path from "path";

const logDir = path.join(__dirname, "../../logs");
const databaseDir = path.join(__dirname, "../../data");

if (existsSync(logDir)) {
    const files = readdirSync(logDir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(logDir, file.name);

        if (file.isFile() && file.name.includes("test")) {
            rmSync(filePath);
        }
    }

    if (readdirSync(logDir).length === 0) {
        rmdirSync(logDir);
    }
}

if (existsSync(path.join(databaseDir, "test.sqlite"))) {
    rmSync(path.join(databaseDir, "test.sqlite"));
}

if (readdirSync(databaseDir).length === 0) {
    rmdirSync(databaseDir);
}
