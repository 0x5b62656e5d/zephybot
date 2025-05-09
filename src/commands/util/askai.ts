import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    MessageActionRowComponentBuilder,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { getGeminiResponse } from "../../util/genai";
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
        )
        .addStringOption(option =>
            option
                .setName(commandEntry.options[1].name)
                .setDescription(commandEntry.options[1].description)
                .setRequired(commandEntry.options[1].required)
        ),
    async execute(interaction: CommandInteraction) {
        if (!interaction.inGuild()) {
            return interaction.reply({
                content: "This command can only be used in a server.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const roles = (interaction.member.roles as GuildMemberRoleManager).cache;

        if (
            !roles.some(role => config.bot.AI_ROLES.includes(role.id)) &&
            interaction.user.id !== config.bot.DEV_USER_ID
        ) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const prompt = (interaction.options as CommandInteractionOptionResolver).getString(
            commandEntry.options[0].name
        );

        await interaction.deferReply();

        const response = await getGeminiResponse(prompt as string);

        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const target = (interaction.options as CommandInteractionOptionResolver).getUser(
            commandEntry.options[1].name
        );

        if (response) {
            try {
                if (target) {
                    return await interaction.editReply({
                        content: `*Suggestion for <@${target.id}>*\n\n> ${response.replace(
                            /\n/g,
                            "\n> "
                        )}\n-# Note that Gemini is an AI model and can make mistakes.`,
                        components: [row],
                    });
                }

                return await interaction.editReply({
                    content: `> ${response.replace(
                        /\n/g,
                        "\n> "
                    )}\n-# Note that Gemini is an AI model and can make mistakes.`,
                    components: [row],
                });
            } catch (error: any) {
                let shortenedResponse: string = "";

                if (error && typeof error === "object" && "code" in error && error.code === 50035) {
                    shortenedResponse = (await getGeminiResponse(
                        ("Your previous response was too long. Please shorten it to less than 1500 characters. Here was the original prompt: " +
                            prompt) as string
                    )) as string;
                }

                if (!shortenedResponse) {
                    return await interaction.editReply(
                        "Sorry, I couldn't find an answer to your question."
                    );
                }

                if (target) {
                    return await interaction.editReply({
                        content: `*Suggestion for <@${target.id}>*\n\n> ${shortenedResponse.replace(
                            /\n/g,
                            "\n> "
                        )}\n-# Note that Gemini is an AI model and can make mistakes.`,
                        components: [row],
                    });
                }

                return await interaction.editReply({
                    content: `> ${shortenedResponse.replace(
                        /\n/g,
                        "\n> "
                    )}\n-# Note that Gemini is an AI model and can make mistakes.`,
                    components: [row],
                });
            }
        } else {
            return await interaction.editReply(
                "Sorry, I couldn't find an answer to your question."
            );
        }
    },
};
