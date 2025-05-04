import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Cooling pads\n\nQ: *What kind of cooling pads should I get?*\nA: IETS GT500/600 or Llano V12/13 is recommended over traditional fan blowers, because of how their designs incorporate sealing foam around the laptop. This helps prevent hot air from recirculating into the laptop as easily.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coolingpads")
        .setDescription("Cooling pad recommendations")
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
