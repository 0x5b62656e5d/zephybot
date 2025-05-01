import { CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("pong!"),
    async execute(interaction: CommandInteraction) {
        interaction.reply({
            content: `:ping_pong: Pong! ${interaction.client.ws.ping}ms`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
