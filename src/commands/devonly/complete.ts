import {
    ChannelType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";
import { deleteEntry, queryByHash } from "../../util/database";

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

        interaction.client.channels
            .fetch(config.bot.DM_CHANNEL_ID as string)
            .then(async channel => {
                if (!channel || !channel.isTextBased() || channel.type !== ChannelType.DM) {
                    return interaction.reply({
                        content: "Could not find the DM.",
                        flags: MessageFlags.Ephemeral,
                    });
                }

                const todo = queryByHash(hash);

                channel.messages
                    .fetch(todo.messageId)
                    .then(async msg => {
                        msg.delete();
                        deleteEntry(hash);

                        interaction.reply({
                            content: `Todo \`${todo.title}\` with hash \`${hash}\` deleted!`,
                            flags: MessageFlags.Ephemeral,
                        });
                    })
                    .catch(error => {
                        console.error(`complete.ts\n${error}`);

                        return interaction.reply({
                            content: `Todo \`${todo.title}\` with message ID \`${todo.messageId}\` not found`,
                            flags: MessageFlags.Ephemeral,
                        });
                    });
            })
            .catch(error => console.error(`complete.ts\n${error}`));
    },
};
