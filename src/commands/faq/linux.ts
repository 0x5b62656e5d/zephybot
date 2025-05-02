import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Linux\n\nQ: *I'm having issues in linux. What do I do?*\nA: The ROG community made a linux guide on <https://asus-linux.org>. If you can't find a fix there, head over to the ROG Linux discord or the Asus ROG subreddit.\n\nDiscord link: https://discord.gg/VK7FdjMrEP\nROG Reddit: <https://reddit.com/r/ASUSROG>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("linux")
        .setDescription("Questions about linux")
        .addUserOption(option => option.setName("target").setDescription("The user to ping")),
    async execute(interaction: CommandInteraction) {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const target = (interaction.options as CommandInteractionOptionResolver).getUser("target");

        if (target) {
            return interaction.reply({
                content: `*Suggestion for <@${target.id}>*\n${string}`,
                components: [row],
            });
        }

        interaction.reply({
            content: `${string}`,
            components: [row],
        });
    },
};
