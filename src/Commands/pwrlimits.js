const string = "I strongly suggest ***against*** undervolting or setting any sort of power limits for your CPU. If you dont wan't your laptop to get that hot, reduce the `CPU Temp Limit` setting. This will change when the CPU will start to throttle. It will affect your performance, however, will be more effective at reducing temps compared to undervolting.";

module.exports = {
    data: {
        name: 'pwrlimits',
        description: 'Power limits FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Power limits\n${string}`,
            components: [row],
        });
    },
};