import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# How to read system logs\n1. Open `Computer Management` from Windows start menu\n2. On the left side, expand `System Tools` -> `Event Viewer` -> `Windows Logs` -> `System`\n\nNote: When reading system logs, ignore entires like `Kernel-power` or `Computer rebooted without cleanly shutting down` or `Unexpected reboot/shutdown`. These just tell you that the system suddenly lost power and experienced an unexpected reboot (likely a BSOD reboot or you force shut down via power button)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("syslogs")
        .setDescription("How to access & read system logs")
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
