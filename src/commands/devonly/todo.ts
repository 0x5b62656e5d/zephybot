import {
    ChannelType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    DMChannel,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { customAlphabet } from "nanoid";
import { database } from "../../index";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";

const getHash = customAlphabet("1234567890abcdef", 6);

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
        )
        .addStringOption(option =>
            option
                .setName(commandEntry.options[1].name)
                .setDescription(commandEntry.options[1].description)
                .setRequired(commandEntry.options[1].required)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== config.bot.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const name = (interaction.options as CommandInteractionOptionResolver).getString(
            commandEntry.options[0].name
        );
        const description = (interaction.options as CommandInteractionOptionResolver).getString(
            commandEntry.options[1].name
        );

        if (!name) {
            return interaction.reply({
                content: "Please provide a todo name.",
                flags: MessageFlags.Ephemeral,
            });
        } else if (!description) {
            return interaction.reply({
                content: "Please provide a todo description.",
                flags: MessageFlags.Ephemeral,
            });
        }

        interaction.client.channels
            .fetch(config.bot.DM_CHANNEL_ID)
            .then(async channel => {
                if (!channel || !channel.isTextBased() || channel.type !== ChannelType.DM) {
                    return interaction.reply({
                        content: "Could not find the channel.",
                        flags: MessageFlags.Ephemeral,
                    });
                }

                const hash = getHash();

                const reply = await (channel as DMChannel).send({
                    content: `# ${name}\n${description}\n-# ${hash}`,
                });

                interaction.reply({
                    content: "Added!",
                    flags: MessageFlags.Ephemeral,
                });

                const query = database.prepare(
                    `INSERT INTO todo (hash, messageId, title, description) VALUES (?, ?, ?, ?)`
                );
                query.run(hash, reply.id, name, description);
            })
            .catch(error => console.error(`todo.ts\n${error}`));
    },
};
