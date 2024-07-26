const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# PCIe compatability\n\nQ: *Can I install a Gen 4 PCIe SSD into my Gen 3 slot?*\nA: Yes, you can. However, the Gen 4 SSD will run at Gen 3 speeds.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pciegen')
        .setDescription('PCIe backwards compatability')
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