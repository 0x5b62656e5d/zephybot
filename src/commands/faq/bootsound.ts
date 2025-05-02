import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Disabling laptop boot sound\n\n### Easy way:\nIn G-Helper, open the `Extra` menu, and at the bottom, uncheck the `Boot Sound` option.\n### Complicated way:\nBoot into BIOS (While laptop is turing on from a shutdown or reboot, keep mashing the `F2` button until you enter BIOS). Press `F7` for `Advanced Mode`. Navigate to the `Boot` menu, then select an entry that has something like \"Animation post-logo configuration\" or something like that. You should see a boot sound option. Disable it, then save and reboot.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bootsound")
        .setDescription("How to disable boot sound")
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
