import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# CPU boost modes\n\n- `Disabled` - Boost is off\n- `Enabled` - CPU boosts when needed\n- `Aggressive` - CPU boosts faster and more often\n- `Aggressive at Guaranteed` - CPU boosts when it can\n- `Efficient Enabled` - Boosts only when needed, but prioritizes saving power\n- `Efficient Aggressive` - Boosts more often than `Efficient Enabled`, but still tries to save power\n- `Efficient Aggressive At Guaranteed` - Boosts more aggressively than `Efficient Aggressive`, but still tries to save power\n\nIt's recommended to stay on efficient aggressive to maintain a balance between performance, temperatures, and battery life. Note that disabling boost in an attempt to lower temperatures may affect performance.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cpuboost")
        .setDescription("What the boost modes mean")
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
