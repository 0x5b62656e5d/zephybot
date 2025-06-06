import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { TodoDatabase } from "../../wrappers/types/TodoDatabase";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";
import { queryByHash, deleteEntry } from "../../util/database";

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

        const hash = (interaction.options as CommandInteractionOptionResolver).getString(
            commandEntry.options[0].name
        );

        if (!hash) {
            return interaction.reply({
                content: "Please provide a todo hash.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const todo = queryByHash(hash);

        if (!todo) {
            return interaction.reply({
                content: `Todo with hash \`${hash}\` not found`,
                flags: MessageFlags.Ephemeral,
            });
        }

        deleteEntry(hash);
        interaction.reply({
            content: `Todo \`${todo.title}\` with hash \`${hash}\` completed!`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
