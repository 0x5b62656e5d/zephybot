const string = "Q: *My laptop's slowing down. Why?*\nA: There are a few possibilities:\n- Keep at least 20-25% of your drive free (if your drive has a capacity of 1TB, keep at least 200-250gb free)\n- Did you install a virus? Perhaps an app that's eating up your resources? (Salad is one example)\n\nSecondly, you can try running 3DMark. The demo version can be installed from Steam for free. Alternatively, you can run Cinebench for CPU, and Furmark for GPU.\n\nQ: *Why is my FPS so low in games?*\nA: Two common possibilities:\n- You're running your games off of the iGPU. Open GHelper, and select the `optimized` or `standard` GPU mode.\n- You have disabled CPU boost in attempt to lengthen battery life. Open GHelper and set CPU boost to `efficient aggressive` or `aggressive`.\n\nYou can also try reinstalling your graphics drivers from their respective vendors.";

module.exports = {
    data: {
        name: 'performance',
        description: 'Performance FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Performance\n${string}`,
            components: [row],
        });
    },
};