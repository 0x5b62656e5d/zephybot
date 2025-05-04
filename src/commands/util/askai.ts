import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    Guild,
    GuildMemberRoleManager,
    MessageActionRowComponentBuilder,
    MessageFlags,
    SlashCommandBuilder,
} from "discord.js";
import { getGeminiResponse } from "../../util/genai";

const roleIdForGemini = [
    "1209991856868565033",
    "1205633126512984154",
    "1205275965945675817",
    "759269276845604885",
    "751116531345260546",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("askai")
        .setDescription("Ask AI a question")
        .addStringOption(option =>
            option.setName("prompt").setDescription("The question to ask").setRequired(true)
        )
        .addStringOption(option => option.setName("target").setDescription("The user to ping")),
    async execute(interaction: CommandInteraction) {
        if (!interaction.inGuild()) {
            return interaction.reply({
                content: "This command can only be used in a server.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const roles = (interaction.member.roles as GuildMemberRoleManager).cache;

        if (
            !roles.some(role => roleIdForGemini.includes(role.id)) &&
            interaction.user.id !== process.env.DEV_USER_ID
        ) {
            return interaction.reply({
                content: "You are not allowed to use this command.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const prompt = (interaction.options as CommandInteractionOptionResolver).getString(
            "prompt"
        );

        await interaction.deferReply();

        const response = await getGeminiResponse(prompt as string);

        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const target = (interaction.options as CommandInteractionOptionResolver).getUser("target");

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
                    content: `> ${response.replace(/\n/g, "\n> ")}-# Note that Gemini is an AI model and can make mistakes.`,
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
                        )}-# Note that Gemini is an AI model and can make mistakes.`,
                        components: [row],
                    });
                }

                return await interaction.editReply({
                    content: `> ${shortenedResponse.replace(/\n/g, "\n> ")}-# Note that Gemini is an AI model and can make mistakes.`,
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
