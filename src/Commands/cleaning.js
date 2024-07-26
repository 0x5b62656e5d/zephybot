const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Cleaning fans\n\nQ: *Do I need to unplug the battery when cleaning the fans?*\nA: No, you don't need to. Just shut down your laptop and clean it.\n\nQ: *What tools do I need?*\nA: A can of compressed air or an electric duster is fine. Just make sure to blow gently. Also, ***do not*** let the fans spin on its own. This can generate current and damage components. ***Do not*** use brushes either, being too rough will damage the fans.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cleaning')
        .setDescription('Cleaning FAQ')
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