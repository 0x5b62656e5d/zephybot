const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Connectivity issues\n\nIf you're having connectivity issues, you most likely have a Mediatek or Realtek network card.\n\n- Tempfix: Try performing a nvram reset (Refer to `/nvram`).\n- Permafix: Swap out the current network card for an Intel AX210.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wireless')
        .setDescription('Wireless FAQ')
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