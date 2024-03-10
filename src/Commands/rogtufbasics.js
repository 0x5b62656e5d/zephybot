const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# ROG/TUF Basics\n1. Crate/MyAsus replacement\n    a) Replace Armory Crate ***and*** MyAsus with GHelper if you haven't already. (Refer to `Replacing AC`)\n        I. Make sure to stop all Asus services in GHelper. (Refer to `Asus services`)\n        II. Leave GHelper settings at default. You do not need to change anything.\n2. Power modes\n    a) When on battery, use `Eco` GPU mode and `Silent` CPU mode\n    b) When plugged in, use `Optimized` GPU mode and `Balanced` CPU mode\n3. Power source\n    a) Try to use the barrel charger at all times. The USBC charger doesn't have bypass and can wear out the battery faster. (Refer to `Battery`)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('basics')
        .setDescription('ROG/TUF Basic FAQ')
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
            content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string}`,
            components: [row],
        });
    },
};