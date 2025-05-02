import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Battery\n\nQ: *How do I check my battery discharge rate?*\nA: To check discharge rates, grab GHelper from <https://github.com/seerge/g-helper/releases/latest>. Don't bother installing software like Batterybar. G-Helper already has discharge monitoring built into it. Refer to `/basics` for tips on increasing battery life.\n\nQ: *My battery wear is at 79%! What do I do?*\nA: The battery wear percentage value is not accurate, you shouldn't worry about it too much. This isn't G-Helper's fault, the sensor readings itself just aren't accurate.\n\nNote: Stay on barrel charger if you can. The Type-C PD does not have bypass. This means that all the power will have to go thru the battery before being delivered to the board, which can wear the battery out faster. The barrel charger doesn't need to go thru the battery, as it has bypass and goes directly to the board. ***However***, if you own a ROG Zephyrus 2024 model or newer, the Type-C PD will ***have*** bypass. But still, stay on the AC adapter for higher workloads. The laptop will still draw power from the battery if the Type-C PD can't provide enough power, even for laptops that have bypass.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("battery")
        .setDescription("Battery drains")
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
