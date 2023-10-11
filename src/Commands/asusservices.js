const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Asus services\nQ: *I ran the uninstaller but when I press M4/ROG, AC still pops up*\nA: Reboot then try again. If that doesn't work, open GHelper, Extras menu, and at the bottom, stop the Asus services\n\nNote: It's generally a good idea to reboot after an installation or an uninstallation of an app. Helps clean up system files and restart system processes to make sure everything's running right.\n\n***LAST RESORT***: If uninstalling AC ***and*** stopping all services from GHelper didn't work, disable armory crate control interface in BIOS.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('asusservices')
        .setDescription('Why does AC still pop up after uninstalling it?')
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