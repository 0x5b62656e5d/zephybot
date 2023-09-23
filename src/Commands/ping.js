module.exports = {
    data: {
        name: 'ping',
        description: 'pong',
    },
 
    run: ({ interaction, client, handler }) => {
		if (interaction.user.id != '936640230272942091') {
            return interaction.reply("You don't have the permissions to run this command");
        }
        interaction.reply(`# pong   🏓\n${Date.now() - interaction.createdTimestamp}ms`);
    },
};