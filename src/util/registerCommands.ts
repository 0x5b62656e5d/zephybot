import { REST, Routes } from "discord.js";
import { CommandClient } from "../wrappers/CommandClient";

const registerCommands = async (client: CommandClient, token: string, applicationId: string) => {
    const rest = new REST().setToken(token);

    try {
        console.log(`Started refreshing ${client.commandList.length} application (/) commands.`);

        await rest.put(Routes.applicationCommands(applicationId), {
            body: client.commandList,
        });

        console.log(`Successfully reloaded ${client.commandList.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
};

export { registerCommands };
