const { REST, Routes } = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');

const rest = new REST().setToken(process.env.TOKEN);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes specified slash commands')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Where to delete the command from')
                .addChoices(
                    { name: 'Global', value: 'global' },
                    { name: 'Guild', value: 'guild' },
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('commandid')
                .setDescription('ID of command')
                .setRequired(true)),
 
    run: ({ interaction, client, handler }) => {
        if (interaction.user.id != '936640230272942091') {
            return interaction.reply("You don't have the permissions to remove commands");
        }

        if (interaction.options.getString('type') === "global") {
            rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, `${interaction.options.getString('commandid')}`))
                .then(() => {
                    console.log(`Successfully removed application command (ID: ${interaction.options.getString('commandid')})`);
                    interaction.reply(`Successfully removed application command (ID: ${interaction.options.getString('commandid')})`);
                })
                .catch(console.error);
        } else if (interaction.options.getString('type') === "guild") {
            rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, `${interaction.options.getString('commandid')}`))
                .then(() => {
                    console.log(`Successfully removed guild command (ID: ${interaction.options.getString('commandid')})`);
                    interaction.reply(`Successfully removed guild command (ID: ${interaction.options.getString('commandid')})`);
                })
                .catch(console.error);
        } else {

        }

    },
};