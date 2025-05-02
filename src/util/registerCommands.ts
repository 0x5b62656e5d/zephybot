import { REST, Routes } from "discord.js";
import { CommandClient } from "../wrappers/CommandClient";

const registerCommands = async (client: CommandClient, token: string, applicationId: string) => {
    const rest = new REST().setToken(token);

    try {
        console.info(`[INFO] Started refreshing ${client.commandList.length} application (/) commands.`);

        await rest.put(Routes.applicationCommands(applicationId), {
            body: client.commandList,
        });

        console.info(`[INFO] Successfully reloaded ${client.commandList.length} application (/) commands.`);
    } catch (error) {
        console.error(`[ERROR] registerCommands.ts\n${error}`);
    }
};

export { registerCommands };
