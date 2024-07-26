const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Cleaning fans\nQ: *Do I need to unplug the battery when cleaning the fans?*\nA: No, I strongly suggest against it. Lots of people come in here or the Zephyrus subreddit because their board got shorted/fried in the process. Just shut down your laptop, and clean the laptop.\n\nSecondly, I also strongly suggest against using brushes. Being too rough can damage/break the fins. A can of compressed air (blow gently) or an electric duster should do the job. Additionally, ***do not*** let the fans spin on its own when blowing on it. This can generate current and can damage components.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cleaning')
        .setDescription('Cleaning FAQ')
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