const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# How to access system logs\n1. Open `Computer Management` from Windows start menu\n2. On the left side, expand `System Tools` -> `Event Viewer` -> `Windows Logs` -> `System`\n\nNote: When reading system logs, ignore entires like `Kernel-power` or `Computer rebooted without cleanly shutting down` or `Unexpected reboot/shutdown`. These just tell you that the system suddenly lost power and experienced an unexpected reboot (likely a BSOD reboot or you force shut down via power button)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('syslogs')
        .setDescription('How to access & read system logs')
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