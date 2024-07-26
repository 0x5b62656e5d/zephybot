const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Power limits\n\nQ: *What values should I set my CPU power settings to? How about GPU?*\nA: You shouldn't need to touch any sort of power limits. If you want to achieve decent battery life, refer to `/basics`. If doing so did not improve battery life, then you got unlucky in the silicon lottery. However, if you insist, just reduce the `CPU Temp Limit` setting in G-Helper.";

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