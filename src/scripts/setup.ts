import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.info("[INFO] Created data directory");
}
