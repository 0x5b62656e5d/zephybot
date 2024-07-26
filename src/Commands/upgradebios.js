const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Upgrading BIOS\n\nTo update bios, download the EZFlash file from Asus, and move it onto a USB drive. Boot into BIOS, and change to advanced mode (should be `F7`). Go to the `Advanced` tab, and select the `EZ Flash Utility` menu. Select the drive, then the file, and proceed to flash.\nOfficial how-to from Asus: https://youtu.be/UUXrTExXDes\n\nQ: *Do I have to rename or format anything to flash?*\nA: No, just drag the file into the USB and boot into BIOS to flash.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upgradebios')
        .setDescription('How to update BIOS')
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