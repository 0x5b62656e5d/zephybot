import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";

const commandEntry = config.bot.commands.COMMAND_MAP[getFileBaseName(__filename)];

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandEntry.name)
        .setDescription(commandEntry.description)
        .addStringOption(option =>
            option
                .setName(commandEntry.options[0].name)
                .setDescription(commandEntry.options[0].description)
                .setRequired(commandEntry.options[0].required)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== config.bot.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const messageId = (interaction.options as CommandInteractionOptionResolver).getString(
            commandEntry.options[0].name
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
                if (msg.author.id !== config.bot.BOT_USER_ID) {
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
