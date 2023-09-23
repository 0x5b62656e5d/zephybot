const {SlashCommandBuilder} = require('discord.js');const string = "Q: *I ran the uninstaller but when I press M4/ROG, AC still pops up*\nA: Reboot then try again. If that doesn't work, open GHelper, Extras menu, and at the bottom, stop the Asus services\n\nNote: It's generally a good idea to reboot after an installation or an uninstallation of an app. Helps clean up system files and restart system processes to make sure everything's running right.";

module.exports = {
    data: {
        name: 'asusservices',
        description: 'Why does AC still pop up after uninstalling it?',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# Asus services\n${string}`);
    },
};