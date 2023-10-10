const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "When you're gaming, you typically shouldn't need `Turbo`. `Balanced` fan curve should be enough\nSecondly, you shouldn't need to do custom fan curves either. Stock fan curves in GHelper should be enough.";

module.exports = {
    data: {
        name: 'fancurves',
        description: 'Fan curves FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Fan curves\n${string}`,
            components: [row],
        });
    },
};