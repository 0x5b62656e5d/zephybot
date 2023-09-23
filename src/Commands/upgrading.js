const string = "Q: *Do I need to unplug the battery when upgrading SSD, wireless card, or RAM?*\nA: Go ahead if you want, but I strongly suggest against it. Lots of people come in here or the Zephyrus subreddit because their board got shorted/fried in the process. Just shut down your laptop, and upgrade the parts.";

module.exports = {
    data: {
        name: 'upgrading',
        description: 'FAQ on upgrading laptop',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# Upgrading\n${string}`);
    },
};