import { Events, Interaction, MessageFlags, TextChannel } from "discord.js";
import { handleMultipleErrors } from "../../util/handleMultipleErrors";

module.exports = {
    name: Events.InteractionCreate,
    eventTitle: "Delete message button interaction",
    async execute(interaction: Interaction) {
        if (!interaction.isButton()) {
            return;
        }

        const [type, id] = interaction.customId.split(".");

        if (type !== "delMsg") {
            return;
        }

        if (interaction.user.id !== id) {
            return interaction.reply({
                content: "You cannot delete this message.",
                flags: MessageFlags.Ephemeral,
            });
        }

        if (!interaction.message.channel) {
            try {
                const channel = await interaction.client.channels.fetch(interaction.channelId) as TextChannel;
                const message = await channel.messages.fetch(interaction.message.id);
                return await message.delete();
            } catch (error) {
                console.error("[ERROR] Failed to fetch channel: ", error);
                handleMultipleErrors(error);

                return interaction.reply({
                    content: `Failed perform this action`,
                    ephemeral: true,
                });
            }
        }

        await interaction.message.delete();
    },
};
