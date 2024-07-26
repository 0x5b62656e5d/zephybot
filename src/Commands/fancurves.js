const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Fan curves\n\nQ: *Are there any good custom fan curves? Should I use my own?*\nA: No, you shouldn't need to mess with fan curves; the defaults are perfectly fine.\n\nQ: *But my laptop is too hot!!!*\nA: Refer to `/temps`. Unless your CPU is exceeding 98 and/or GPU exceeding 84-86, there's nothing to worry about.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fancurves')
        .setDescription('Fan curves FAQ')
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