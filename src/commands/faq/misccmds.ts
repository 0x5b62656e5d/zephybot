import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Misc commands\n\nsfc: `sfc /scannow`\nThis command scans all protected system files and replaces any corrupted files with a cached copy. (Optional) Run the `DISM` command before running the `sfc` command.\n\nDISM: `DISM /online /cleanup-image /restorehealth` (Unless specified, just run the command with the `/restorehealth` flag. You don't need to run all 3 flags.)\n- `/restorehealth` option will automatically scan and repair common issues\n- `/scanhealth` option performs a more advanced scan to determine whether the image has any problems\n- `/checkhealth` option determines any corruptions inside the local Windows image (Does not perform any repairs)\n\n***Note: Make sure to run these commands in CMD with administrator privileges.***\n***Reboot after running either/both commands***";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("misccmds")
        .setDescription("Miscellaneous commands")
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
