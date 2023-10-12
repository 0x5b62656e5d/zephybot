const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toadd')
        .setDescription('Sends pepper something to fix/add')
        .addStringOption(option =>
            option.setName('reminder')
                .setDescription('The input to echo back')
                .setRequired(true)),
 
    run: ({ interaction, client, handler }) => {
        client.users.send('936640230272942091', interaction.options.getString('reminder') + ` - Sent by ${interaction.user}`);
        interaction.reply({
            content: `${interaction.user} - Reminder sent to pepper`,
            ephemeral: true,
        });
    },
};