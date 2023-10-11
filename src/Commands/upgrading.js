const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Upgrading\nQ: *Do I need to unplug the battery when upgrading SSD, wireless card, or RAM?*\nA: Go ahead if you want, but I strongly suggest against it. Lots of people come in here or the Zephyrus subreddit because their board got shorted/fried in the process. Just shut down your laptop, and upgrade the parts.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upgrading')
        .setDescription('Upgrading FAQ')
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