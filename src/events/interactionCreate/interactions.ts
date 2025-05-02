import { Client, Events, Interaction, MessageFlags } from "discord.js";

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = (
            interaction.client as Client<true> & { commands: Map<string, any> }
        ).commands.get(interaction.commandName);

        if (!command) {
            console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`[ERROR] interactions.ts\n${error}`);
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
