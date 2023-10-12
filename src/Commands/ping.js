module.exports = {
    data: {
        name: 'ping',
        description: 'pong',
    },
 
    run: ({ interaction, client, handler }) => {
        interaction.reply({
            content: `# pong   🏓\n${Date.now() - interaction.createdTimestamp}ms`,
            ephemeral: true
        });
    },
};