const string = "To update bios, download the EZFlash file from Asus, and move it onto a USB drive. Boot into BIOS, and change to advanced mode (should be `F7`). Go to the `Advanced` tab, and select the `EZ Flash Utility` menu. Select the drive, then the file, and proceed to flash.\nOfficial how-to from Asus: https://youtu.be/UUXrTExXDes\n\nQ: *Do I have to rename or format anything to flash?*\nA: No, just drag the file into the USB and boot into BIOS to flash.";

module.exports = {
    data: {
        name: 'upgradebios',
        description: 'How to update BIOS',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Upgrading BIOS\n${string}`,
            components: [row],
        });
    },
};