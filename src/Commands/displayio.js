const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Display IO\n\nQ: *Which ports use dGPU and which ports use iGPU?*\n\n***HDMI*** - dGPU\n***Right USBC*** - dGPU\n***Left USBC*** - iGPU\n\nNote: 2021 and older Zephyrus models have different IO ports:\n***HDMI*** - iGPU\n***Left USBC*** - dGPU";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('displayio')
        .setDescription('Display output ports')
        .addUserOption(option => option.setName('target').setDescription('User to tag')),

    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);

        if (interaction.options.getUser('target') === null) {
            return interaction.reply({
                content: `${string}`,
                components: [row],
            });
        }
        
        interaction.reply({
            content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string}`,
            components: [row],
        });
    },
};