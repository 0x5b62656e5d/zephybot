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

const getHash = customAlphabet("1234567890abcdef", 6);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todo")
        .setDescription("Add a todo item")
        .addStringOption(option =>
            option.setName("name").setDescription("The name of todo to add").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description").setDescription("The description of the todo").setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== config.bot.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const name = (interaction.options as CommandInteractionOptionResolver).getString("name");
        const description = (interaction.options as CommandInteractionOptionResolver).getString("description");

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

                const query = database.prepare(`INSERT INTO todo (hash, messageId, title, description) VALUES (?, ?, ?, ?)`);
                query.run(hash, reply.id, name, description);
            })
            .catch(error => console.error(`todo.ts\n${error}`));
    },
};
