const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "Source code: <https://github.com/0x5b62656e5d/zephybot>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sourcecode')
        .setDescription('Source code of bot')
        .addUserOption(option => option.setName('target').setDescription('User to tag')),

    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);

        if (interaction.options.getUser('target') === null) {
            return interaction.reply({
                content: `${string}`,
                components: [row],
            });
        }
        
        interaction.reply({
            content: `<@${interaction.options.getUser('target').id}>\n${string}`,
            components: [row],
        });
    },
};