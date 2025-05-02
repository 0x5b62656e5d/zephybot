import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Display IO\n\nQ: *Which ports use dGPU and which ports use iGPU?*\n\n***HDMI*** - dGPU\n***Right USBC*** - dGPU\n***Left USBC*** - iGPU\n\nNote: 2021 and older Zephyrus models have different IO ports:\n***HDMI*** - iGPU\n***Left USBC*** - dGPU";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("displayio")
        .setDescription("Display output ports")
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
