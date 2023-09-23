const string = "Q: *Geforce experience says I'm not able to update my graphics drivers. Why? My GPU's fine!*\nA: Are you on eco? If so, switch to optimized or standard.";

module.exports = {
    data: {
        name: 'gpu',
        description: 'GPU FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`# GPU\n${string}`);
    },
};