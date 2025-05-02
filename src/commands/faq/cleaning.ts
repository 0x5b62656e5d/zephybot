import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Cleaning fans\n\nQ: *Do I need to unplug the battery when cleaning the fans?*\nA: No, you don't need to. Just shut down your laptop and clean it.\n\nQ: *What tools do I need?*\nA: A can of compressed air or an electric duster is fine. Just make sure to blow gently. Also, ***do not*** let the fans spin on its own. This can generate current and damage components. ***Do not*** use brushes either, being too rough will damage the fans.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cleaning")
        .setDescription("How to clean my laptop fans")
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
