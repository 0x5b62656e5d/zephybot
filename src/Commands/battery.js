const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "Q: *How do I check my battery discharge rate and wear?*\nA: Generally, you shouldn't need to worry about battery wear too much. For discharge, grab GHelper from https://github.com/seerge/g-helper/releases/latest.\n\nNote: Stay on barrel charger if you can. The type-c PD does not have bypass. This means that all the power will have to go thru the battery before being delivered to the board, which can wear the battery out faster. The barrel charger doesn't need to go thru the battery, as it has bypass and goes directly to the board.";

module.exports = {
    data: {
        name: 'battery',
        description: 'Battery FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Battery\n${string}`,
            components: [row],
        });
    },
};