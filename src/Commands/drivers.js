const string = "Let Windows updates take care of your drivers. Asus drivers can get pretty old, as they don't update them often. If you don't have internet access, use ethernet or plug your phone into your laptop for hotspot.\nFor graphics drivers, install them from their respective vendors.";

module.exports = {
    data: {
        name: 'drivers',
        description: 'Drivers FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Drivers\n${string}`,
            components: [row],
        });
    },
};