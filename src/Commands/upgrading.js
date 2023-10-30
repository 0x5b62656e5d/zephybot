const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string1 = "# Upgrading\nQ: *Do I need to unplug the battery when upgrading SSD, wireless card, or RAM?*\nA: Go ahead if you want, but I strongly suggest against it. Lots of people come in here or the Zephyrus subreddit because their board got shorted/fried in the process. Just shut down your laptop, and upgrade the parts.";
const string2 = "# Upgrading - Battery Cutoff\nSome models are known to have a sensor that automatically cuts the battery circuit when the laptop cover is opened (eg, M16 2023).\n\nIf you see this sensor on your motherboard, then you absolutely will not need to disconnect the battery for basic tasks like cleaning and/or upgrades.\nNote: You shouldn't need to disconnect the battery on models that don't have the sensor either. Just shut down your laptop and continue with cleaning/upgrades (Refer to `/upgrading`)\n\nhttps://imgur.com/a/q1uNZzr";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upgrading')
        .setDescription('Upgrading FAQ')
        .addStringOption(option => 
            option.setName('subcmd')
                .setDescription('Which tip to give')
                .addChoices(
                    { name: 'Upgrading tip', value: 'upgrade' },
                    { name: 'Battery cutoff', value: 'batteryCutoff' },
                )
                .setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('User to tag')),
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        if (interaction.options.getUser('target') === null) {
            if (interaction.options.getString('subcmd') === "upgrade") {
                return interaction.reply({
                    content: `${string1}`,
                    components: [row],
                });
            } else if (interaction.options.getString('subcmd') === "batteryCutoff") {
                return interaction.reply({
                    content: `${string2}`,
                    components: [row],
                });
            }            
        }

        if (interaction.options.getString('subcmd') === "upgrade") {
            return interaction.reply({
                content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string1}`,
                components: [row],
            });
        } else if (interaction.options.getString('subcmd') === "batteryCutoff") {
            return interaction.reply({
                content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string2}`,
                components: [row],
            });
        }
    },
};