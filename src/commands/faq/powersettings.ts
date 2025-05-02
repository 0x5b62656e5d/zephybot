import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Power settings\n\nQ: *What power settings should I use? Are there any good ones?*\nA: There shouldn't be a need to adjust power settings in GHelper; the defaults work perfectly fine.\n\nQ: *But my laptop is too hot!!!*\nA: Refer to `/temps`. Unless your CPU is exceeding 98 and/or GPU exceeding 84-86, there's nothing to worry about.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("powersettings")
        .setDescription("Should the power settings in GHelper need to be adjusted?")
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
