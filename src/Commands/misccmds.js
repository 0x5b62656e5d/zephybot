const string = "sfc: `sfc /scannow`\nThis command scans all protected system files and replaces any corrupted files with a cached copy. (Optional) Run the `DISM` command before running the `sfc` command.\n\nDISM: `DISM /online /cleanup-image /restorehealth`\n- `/restorehealth` option will automatically scan and repair common issues\n- `/scanhealth` option performs a more advanced scan to determine whether the image has any problems\n- `/checkhealth` option determines any corruptions inside the local Windows image (Does not perform any repairs)\n\n***Reboot after running either/both commands***";

module.exports = {
    data: {
        name: 'misccmds',
        description: 'Miscellaneous commands',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Misc commands\n${string}`,
            components: [row],
        });
    },
};