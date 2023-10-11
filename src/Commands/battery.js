const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Battery\nQ: *How do I check my battery discharge rate and wear?*\nA: Generally, you shouldn't need to worry about battery wear too much. For discharge, grab GHelper from https://github.com/seerge/g-helper/releases/latest.\n\nNote: Stay on barrel charger if you can. The type-c PD does not have bypass. This means that all the power will have to go thru the battery before being delivered to the board, which can wear the battery out faster. The barrel charger doesn't need to go thru the battery, as it has bypass and goes directly to the board.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battery')
        .setDescription('Battery FAQ')
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