import { customAlphabet } from "nanoid";
import {
    ChannelType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    DMChannel,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { database } from "../../index";

const getHash = customAlphabet("1234567890abcdef", 6);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todo")
        .setDescription("Add a todo item")
        .addStringOption(option =>
            option.setName("todo").setDescription("The todo item to add").setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== process.env.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const todo = (interaction.options as CommandInteractionOptionResolver).getString("todo");

        if (!todo) {
            return interaction.reply({
                content: "Please provide a todo item.",
                flags: MessageFlags.Ephemeral,
            });
        }

        interaction.client.channels
            .fetch(process.env.DM_ID as string)
            .then(async channel => {
                if (!channel || !channel.isTextBased() || channel.type !== ChannelType.DM) {
                    return interaction.reply({
                        content: "Could not find the channel.",
                        flags: MessageFlags.Ephemeral,
                    });
                }

                const hash = getHash();

                const reply = await (channel as DMChannel).send({
                    content: `Todo item: ${todo}\nTodo hash: ${hash}`,
                });

                interaction.reply({
                    content: "Added!",
                    flags: MessageFlags.Ephemeral,
                });

                const query = database.prepare(`INSERT INTO todo (hash, messageId) VALUES (?, ?)`);
                query.run(hash, reply.id);
            })
            .catch(error => console.error(`[ERROR] todo.ts\n${error}`));
    },
};
