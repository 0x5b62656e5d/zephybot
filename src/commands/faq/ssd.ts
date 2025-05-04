import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# SSD optimization\n\nQ: *How do I optimize my SSD?*\nA: To maximize SSD performance, keep at least 30-35% free. For example, for a 1TB SSD, keep at least 300-350GB free. This is because when an SSD is nearly full, the controller has less free space available for read/write operations, leading to slower performance.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ssd")
        .setDescription("How to optimize SSD performance")
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
