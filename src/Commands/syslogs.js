const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "1. Open `Computer Management` from Windows start menu\n2. On the left side, expand `System Tools` -> `Event Viewer` -> `Windows Logs` -> `System`\n\nNote: When reading system logs, ignore entires like `Kernel-power` or `Computer rebooted without cleanly shutting down` or `Unexpected reboot/shutdown`. These just tell you that the system suddenly lost power and experienced an unexpected reboot (likely a BSOD reboot or you force shut down via power button)";

module.exports = {
    data: {
        name: 'syslogs',
        description: 'How to access & read system logs',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# How to access system logs\n${string}`,
            components: [row],
        });
    },
};