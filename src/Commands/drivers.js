const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Drivers\n\nLet Windows updates take care of your drivers. Asus drivers can get pretty old, as they don't update them often. If you don't have internet access, use ethernet or plug your phone into your laptop for hotspot.\nFor graphics drivers, install them from their respective vendors.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drivers')
        .setDescription('Drivers FAQ')
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