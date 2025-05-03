import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";

const string = "";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletemsg")
        .setDescription("Delete a message")
        .addStringOption(option =>
            option.setName("messageid").setDescription("The ID of the message").setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== process.env.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const messageId = (interaction.options as CommandInteractionOptionResolver).getString(
            "messageid"
        );

        if (!messageId) {
            return interaction.reply({
                content: "Please provide a message ID.",
                flags: MessageFlags.Ephemeral,
            });
        }

        interaction.channel?.messages
            .fetch(messageId)
            .then(async msg => {
                if (msg.author.id !== process.env.BOT_USER_ID) {
                    return interaction.reply({
                        content: `You can only delete messages sent by the bot.`,
                        flags: MessageFlags.Ephemeral,
                    });
                }

                try {
                    msg.delete();
                } catch (error) {
                    console.error("Failed to delete message: ", error);

                    return interaction.reply({
                        content: `Failed to delete message with ID \`${messageId}\`.`,
                        flags: MessageFlags.Ephemeral,
                    });
                }

                interaction.reply({
                    content: `Message with ID \`${messageId}\` deleted!`,
                    flags: MessageFlags.Ephemeral,
                });
            })
            .catch(error => {
                console.error("Failed to fetch message: ", error);
                interaction.reply({
                    content: `Message with ID \`${messageId}\` not found`,
                    flags: MessageFlags.Ephemeral,
                });
            });
    },
};
