const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

// const string = "Don't ask to ask. Just ask your question. Asking \"Does anyone have a Strix?\" or \"Does anyone have a X13?\" isn't going to help you.\n\nThis is an example of a good question: \"My 6700s G14 keeps suddenly freezing when I launch a game. Why does this happen?\"\nThis is an example of a bad question: \"Does anyone have a G14 2020?\"\n\nAlso, be sure to provide enough info. It's hard to help you out when we don't know anything about the problem.";
const string = "https://dontasktoask.com";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('How to ask better questions')
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