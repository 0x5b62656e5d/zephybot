interface Config {
    bot: BotConfig;
    apiKeys: ApiKeys;
    database: DatabaseConfig;
};

interface BotConfig {
    TOKEN: string;
    APPLICATION_ID: string;
    BOT_USER_ID: string;
    DEV_GUILD_ID: string;
    DEV_USER_ID: string;
    DM_CHANNEL_ID: string;
    AI_ROLES: string[];
    commands: CommandConfig;
};

interface CommandConfig {
    COMMANDS_PER_HELP_PAGE: number;
    BOT_PFP: string;
    DEV_PFP: string;
    COMMAND_MAP: Record<string, CommandEntry>;
}

interface ApiKeys {
    GEMINI: string;
};

interface DatabaseConfig {
    path: string;
};

interface CommandEntry {
    name: string;
    description: string;
    string?: string;
    options: [string, string, boolean][];
}

export { Config, BotConfig, ApiKeys, DatabaseConfig };