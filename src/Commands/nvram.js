const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "The laptop should be ***powered off*** to begin with. Hold power button for around 30 seconds. The laptop should turn on very briefly then shut off right after. Release the power button then boot the laptop.";

module.exports = {
    data: {
        name: 'nvram',
        description: 'How to perform a NVRAM reset',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# NVRAM reset\n${string}`,
            components: [row],
        });
    },
};