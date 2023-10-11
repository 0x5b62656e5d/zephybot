const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Power limits\nI strongly suggest ***against*** undervolting or setting any sort of power limits for your CPU. If you dont wan't your laptop to get that hot, reduce the `CPU Temp Limit` setting. This will change when the CPU will start to throttle. It will affect your performance, however, will be more effective at reducing temps compared to undervolting.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pwrlimits')
        .setDescription('Power limits FAQ')
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