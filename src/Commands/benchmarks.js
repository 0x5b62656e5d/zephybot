const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Common benchmark tools\n\n### Basic (CPU & GPU)\n3DMark - <https://www.3dmark.com/> /  <https://store.steampowered.com/app/223850/3DMark/> (*Demo*)\n\n### More advanced benchmark tools\n\n- CPU\nAIDA64 - <https://www.aida64.com/downloads>\nCinebench - <https://www.maxon.net/en/downloads/>\n\n- GPU\nAIDA64 - <https://www.aida64.com/downloads>\nFurmark - <https://geeks3d.com/furmark/>\nHeaven, Valley, Superposition - <https://benchmark.unigine.com/>\n\n- Combined\nAIDA64 - <https://rentry.org/stresstest> (*How-to*)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('benchmarks')
        .setDescription('List of common & recommended benchmarks')
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