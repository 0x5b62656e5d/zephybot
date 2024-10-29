const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Linux\n\nQ: *I'm having issues in linux. What do I do?*\nA: The ROG community made a linux guide on <https://asus-linux.org>. If you can't find a fix there, head over to the ROG Linux discord or the Asus ROG subreddit.\n\nDiscord link: https://discord.gg/A5CyZEw3se\nROG Reddit: <https://reddit.com/r/ASUSROG>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linux')
        .setDescription('Linux FAQ')
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