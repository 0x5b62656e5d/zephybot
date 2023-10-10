const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "Q: *Geforce experience says I'm not able to update my graphics drivers. Why? My GPU's fine!*\nA: Are you on eco? If so, switch to optimized or standard.";

module.exports = {
    data: {
        name: 'gpu',
        description: 'GPU FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# GPU\n${string}`,
            components: [row],
        });
    },
};