const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# GPU\n\nQ: *Geforce experience says I'm not able to update my graphics drivers. Why?*\nA: Are you on eco GPU mode? If so, switch to optimized or standard in G-Helper.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpu')
        .setDescription('GPU FAQ')
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