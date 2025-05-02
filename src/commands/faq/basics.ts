import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Basics\n\n1. Crate/MyAsus replacement\n    a) Replace Armory Crate ***and*** MyAsus with GHelper if you haven't already. (Refer to `/replacingac` and `/asusservices`)\n        I. Grab the ***official*** crate uninstaller from the [crate install page](<https://www.asus.com/supportonly/armoury%20crate/helpdesk_download/>) and run it. Make sure to reboot afterwards.\n        II. Uninstall MyAsus from control panel or the start menu.\n        III. Get G-Helper from <https://github.com/seerge/g-helper>.\n        IV. Go to the `Extras` menu in G-Helper and stop Asus services.\n2. Power modes\n    a) When on battery, use `Eco` GPU mode and `Silent` CPU mode\n    b) When plugged in, use `Optimized` GPU mode and `Balanced` CPU mode\n3. Power (Refer to `/battery`)\n    a) Try to use the barrel charger at all times. The USBC charger doesn't have bypass and can wear out the battery faster. (Refer to `Battery`)\n    b) If you're going to be always plugged in, set battery charge to 60%. If you're going to be moving around for school or work, set it to 80-85% (Battery chemistry: Li-ion batteries last longer when kept between 20-80%)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("basics")
        .setDescription("ROG/TUF basics")
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
