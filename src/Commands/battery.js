const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Battery\n\nQ: *How do I check my battery discharge rate?*\nA: To check discharge rates, grab GHelper from <https://github.com/seerge/g-helper/releases/latest>. Don't bother installing software like Batterybar. G-Helper already has discharge monitoring built into it.\n\nQ: *My battery wear is at 79%! What do I do?*\nA: The battery wear percentage value is not accurate, you shouldn't worry about it too much. This isn't G-Helper's fault, the sensor readings itself just aren't accurate.\n\nNote: Stay on barrel charger if you can. The Type-C PD does not have bypass. This means that all the power will have to go thru the battery before being delivered to the board, which can wear the battery out faster. The barrel charger doesn't need to go thru the battery, as it has bypass and goes directly to the board. ***However***, if you own a ROG Zephyrus 2024 model or newer, the Type-C PD will ***have*** bypass.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battery')
        .setDescription('Battery FAQ')
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