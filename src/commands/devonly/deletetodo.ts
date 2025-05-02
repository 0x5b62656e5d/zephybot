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
        .setName("deletetodo")
        .setDescription("Manually delete a todo item")
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

        const todo = database
            .prepare(`SELECT * FROM todo WHERE hash = ?`)
            .get(hash) as TodoDatabase;

        if (!todo) {
            return interaction.reply({
                content: `Todo with hash \`${hash}\` not found`,
                flags: MessageFlags.Ephemeral,
            });
        }
            
        database.prepare(`DELETE FROM todo WHERE hash = ?`).run(hash);
        interaction.reply({
            content: `Todo \`${todo.title}\` with hash \`${hash}\` completed!`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
