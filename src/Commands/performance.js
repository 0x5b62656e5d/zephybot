const string = "Q: *My laptop's slowing down. Why?*\nA: There are a few possibilities.\n- Keep at least 20-25% of your drive free (if your drive has a capacity of 1TB, keep at least 200-250gb free)\n- Did you install a virus? Perhaps an app that's eating up your resources? (Salad is one example)\n\nSecondly, you can try running 3DMark. The demo version can be installed from Steam for free. Alternatively, you can run Cinebench for CPU, and Furmark for GPU.";

module.exports = {
    data: {
        name: 'performance',
        description: 'Performance FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# Performance\n${string}`);
    },
};