import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Upgrading BIOS\n\nTo update bios, download the EZFlash file from Asus, and move it onto a USB drive. Boot into BIOS, and change to advanced mode (should be `F7`). Go to the `Advanced` tab, and select the `EZ Flash Utility` menu. Select the drive, then the file, and proceed to flash.\nOfficial how-to from Asus: https://youtu.be/UUXrTExXDes\n\nQ: *Do I have to rename or format anything to flash?*\nA: No, just drag the file into the USB and boot into BIOS to flash.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("upgradebios")
        .setDescription("How to upgrade the BIOS")
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
