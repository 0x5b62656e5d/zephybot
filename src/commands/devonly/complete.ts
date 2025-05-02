import {
    ChannelType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { database } from "../../index";
import { TodoDatabase } from "../../wrappers/types/TodoDatabase";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("complete")
        .setDescription("Complete a todo item")
        .addStringOption(option =>
            option.setName("hash").setDescription("The hash of the todo").setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.id !== process.env.DEV_USER_ID) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const hash = (interaction.options as CommandInteractionOptionResolver).getString("hash");

        if (!hash) {
            return interaction.reply({
                content: "Please provide a todo hash.",
                flags: MessageFlags.Ephemeral,
            });
        }

        interaction.client.channels
            .fetch(process.env.DM_ID as string)
            .then(async channel => {
                if (!channel || !channel.isTextBased() || channel.type !== ChannelType.DM) {
                    return interaction.reply({
                        content: "Could not find the DM.",
                        flags: MessageFlags.Ephemeral,
                    });
                }

                const todo = database
                    .prepare(`SELECT * FROM todo WHERE hash = ?`)
                    .get(hash) as TodoDatabase;

                channel.messages.fetch(todo.messageId).then(async msg => {
                    msg.delete();
                    database.prepare(`DELETE FROM todo WHERE hash = ?`).run(hash);

                    interaction.reply({
                        content: `Todo \`${todo.title}\` with hash \`${hash}\` deleted!`,
                        flags: MessageFlags.Ephemeral,
                    });
                }).catch(error => {
                    console.error(`[ERROR] complete.ts\n${error}`);

                    return interaction.reply({
                        content: `Todo \`${todo.title}\` with message ID \`${todo.messageId}\` not found`,
                        flags: MessageFlags.Ephemeral,
                    });
                });
            })
            .catch(error => console.error(`[ERROR] complete.ts\n${error}`));
    },
};
