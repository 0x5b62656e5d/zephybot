import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import { Config } from "../wrappers/types/ConfigTypes";
import { existsSync, mkdirSync } from "fs";
import { loadDatabase } from "./database";

if (process.env.NODE_ENV !== "ci") {
    dotenv.config({ path: path.join(process.cwd(), ".env") });
}

if (!process.env.TOKEN) {
    throw new Error("Environment Variable [ TOKEN ] is missing");
}

if (!process.env.APPLICATION_ID) {
    throw new Error("Environment Variable [ APPLICATION_ID ] is missing");
}

if (!process.env.DEV_GUILD_ID) {
    throw new Error("Environment Variable [ DEV_GUILD_ID ] is missing");
}

if (!process.env.DEV_USER_ID) {
    throw new Error("Environment Variable [ DEV_USER_ID ] is missing");
}

if (!process.env.DM_CHANNEL_ID) {
    throw new Error("Environment Variable [ DM_CHANNEL_ID ] is missing");
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Environment Variable [ GEMINI_API_KEY ] is missing");
}

if (existsSync(path.resolve(process.cwd(), "src", "util", "faq.json"))) {
    throw new Error("FAQ file [ faq.json ] is missing");
}

if (existsSync(path.resolve(process.cwd(), "logs"))) {
    mkdirSync(path.resolve(process.cwd(), "logs"), { recursive: true });
}

const config: Config = {
    bot: {
        TOKEN: process.env.TOKEN,
        APPLICATION_ID: process.env.APPLICATION_ID,
        BOT_USER_ID: "1151023270636818483",
        DEV_GUILD_ID: process.env.DEV_GUILD_ID,
        DEV_USER_ID: process.env.DEV_USER_ID,
        DM_CHANNEL_ID: process.env.DM_CHANNEL_ID,
        AI_ROLES: [
            "1209991856868565033",
            "1205633126512984154",
            "1205275965945675817",
            "759269276845604885",
            "751116531345260546",
        ],
        commands: {
            COMMANDS_PER_HELP_PAGE: 6,
            BOT_PFP:
                "https://cdn.discordapp.com/avatars/1151023270636818483/e0fb09065c262cd885289203bb4219f6.webp?size=1024&width=0&height=230",
            DEV_PFP: "https://cdn.pepper.fyi/pfp.png",
            COMMAND_MAP: JSON.parse(
                readFileSync(path.join(process.cwd(), "src", "util", "commandmap.json"), "utf-8")
            ),
        },
    },
    apiKeys: {
        GEMINI: process.env.GEMINI_API_KEY,
    },
    database: {
        path: path.resolve(process.cwd(), "data"),
        database: loadDatabase(
            path.join("data", `${process.env.DB_FILE === "test" ? `test` : `database`}.sqlite`)
        ),
    },
    logger: {
        path: path.resolve(process.cwd(), "logs"),
    },
};

export default config;
