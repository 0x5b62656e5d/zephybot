import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Upgrading\n\nQ: *Do I need to unplug the battery when upgrading SSD, network card, or RAM?*\nA: No, you shouldn't need to. Lots of people have accidentally shorted/fried the motherboard in the process. Just shut downt he lapto properly and upgrade the parts.\n\nNote: Most newer than 2023 has an ambient light sensor that automatically cut the power upon opening the cover. To restore power to the laptop, close the cover and plug in the AC adapter and boot it. It looks something like the image attached below. https://imgur.com/a/q1uNZzr\n\nNote: The RAM of ROG Zephyrus models released after 2024 are not able to be upgraded. Only the SSD and the network card can be upgraded for those models.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("upgrading")
        .setDescription("Upgrading the laptop")
        .addUserOption(option => option.setName("target").setDescription("The user to ping")),
    async execute(interaction: CommandInteraction) {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const target = (interaction.options as CommandInteractionOptionResolver).getUser("target");

        if (target) {
            return interaction.reply({
                content: `*Suggestion for <@${target.id}>*\n${string}`,
                components: [row],
            });
        }

        interaction.reply({
            content: `${string}`,
            components: [row],
        });
    },
};
