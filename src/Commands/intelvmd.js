const string = "While clean installing Windows, you disabled VMD, and you performed a BIOS update and it now refuses to boot, the BIOS update has re-enabled VMD. Go to BIOS then disable it. Your laptop should boot normally now.";

module.exports = {
    data: {
        name: 'intelvmd',
        description: 'Potential solution to laptop not booting (INTEL ONLY)',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Laptop not booting (***INTEL ONLY***)\n${string}`,
            components: [row],
        });
    },
};