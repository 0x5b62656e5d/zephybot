const string = "Q: *Do I need to unplug the battery when cleaning the fans?*\nA: No, I strongly suggest against it. Lots of people come in here or the Zephyrus subreddit because their board got shorted/fried in the process. Just shut down your laptop, and clean the laptop.\n\nSecondly, I also strongly suggest using brushes. Being too rough can damage/break the fins. A can of compressed air (blow gently) or an electric duster should do the job. Additionally, ***do not*** let the fans spin on its own when blowing on it. This can generate current and can damage components.";

module.exports = {
    data: {
        name: 'cleaning',
        description: 'Cleaning FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# Cleaning fans\n${string}`);
    },
};