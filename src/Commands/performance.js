const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Performance\n\nQ: *My laptop's slowing down. Why?*\nA:\n- Keep at least 25-30% of your drive free (if your drive has a capacity of 1TB, keep at least 250-300gb free)\n- Did you accidentally install malware? Perhaps an app that's eating up your resources? (Refer to `/cleanstall` if needed)\n\nQ: *Why is my FPS so low in games?*\nA:\n- You're running your games off of the iGPU. Open G-Helper, and select the `optimized` or `standard` (or `ultimate` if applicable) GPU mode.\n- You have disabled CPU boost in attempt to lengthen battery life. Open G-Helper and set CPU boost to `efficient aggressive` or `aggressive`.\n\nYou can also try reinstalling your graphics drivers from their respective vendors.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('performance')
        .setDescription('Performance FAQ')
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