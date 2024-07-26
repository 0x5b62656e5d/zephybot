const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# NVRAM Reset\n\nThe laptop should be ***powered off*** and with ***all*** external devices unplugged to begin with. Hold power button for around 30 seconds. The laptop should turn on very briefly then shut off right after. Release the power button then boot the laptop.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nvram')
        .setDescription('How to perform a NVRAM reset')
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