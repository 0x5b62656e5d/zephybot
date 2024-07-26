const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Disabling laptop boot sound\n### Easy way:\nIn GHelper, open the `Extra` menu, and at the bottom, uncheck the `Boot Sound` option.\n### Complicated way:\nBoot into BIOS (While laptop is turing on from a shutdown or reboot, keep mashing the `F2` button until you enter BIOS). Press `F7` for `Advanced Mode`. Navigate to the `Boot` menu, then select an entry that has something like \"Animation post-logo configuration\" or something like that. You should see a boot sound option. Disable it, then save and reboot.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bootsound')
        .setDescription('How to disable boot sound')
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