import { Client, Events, Interaction, MessageFlags } from "discord.js";
import { handleMultipleErrors } from "../../util/handleMultipleErrors";

module.exports = {
    name: Events.InteractionCreate,
    eventTitle: "Bot interaction creation",
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = (
            interaction.client as Client<true> & { commands: Map<string, any> }
        ).commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`interactions.ts\n${error}`);
            handleMultipleErrors(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    },
};
