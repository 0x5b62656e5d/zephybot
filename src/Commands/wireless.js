const string = "If you have wireless issues, you could try performing an `NVRAM Reset` (run `?nvram`).\nIf the issue still persists and your laptop has the Mediatek wireless card, I suggest swapping it out to an Intel AX210.";

module.exports = {
    data: {
        name: 'wireless',
        description: 'Wireless FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# Connectivity issues\n${string}`);
    },
};