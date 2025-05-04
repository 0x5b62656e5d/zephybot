import { existsSync, mkdirSync } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

if (!existsSync(dataDir)) {
    mkdirSync(dataDir);
    console.info("Created data directory");
}
