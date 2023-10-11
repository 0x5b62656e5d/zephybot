const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Linux\nQ: *I'm having issues on linux. My speakers are weird, and my GPU isn't showing up. What do I do?*\nA: The ROG community made a linux guide on https://asus-linux.org. If you can't find a fix there, head over to the ROG Linux discord.\n\nQ: *The guide doesn't support Manjaro or CentOS!!!! It's a bad guide!!!*\nA: The guide is made by community members. It takes lots of effort research and put in fixes for various types of bugs found in various distros. If it's not in there, head over to the ROG Linux discord or the Asus ROG subreddit and ask your questions there. Not being there doesn't mean its not supported.\n\nDiscord link: discord.gg/4ZKGd7Un5t\nROG Reddit: https://reddit.com/r/ASUSROG";

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