const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const string = "### Basic (CPU & GPU)\n3DMark - <https://www.3dmark.com/> /  <https://store.steampowered.com/app/223850/3DMark/> (*Demo*)\n\n### More advanced benchmark tools\n\n- CPU\nAIDA64 - <https://www.aida64.com/downloads>\nCinebench - <https://www.maxon.net/en/downloads/>\n\n- GPU\nAIDA64 - <https://www.aida64.com/downloads>\nFurmark - <https://geeks3d.com/furmark/>\nHeaven, Valley, Superposition - <https://benchmark.unigine.com/>\n\n- Combined\nAIDA64 - <https://rentry.org/stresstest> (*How-to*)\n\nHowever, I suggest just sticking to 3DMark, as it provides a pretty detailed benchmark analysis that can be easily understood by everyone.";

module.exports = {
    data: {
        name: 'benchmarks',
        description: 'Small list of common & recommended benchmarks',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Common benchmark tools\n${string}`,
            components: [row],
        });
    },
};