import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "Run the ***Timespy benchmark*** from [3DMark demo](<https://store.steampowered.com/app/223850/3DMark/>) and send screenshots of all the graphs and the results screen. This may help us determine what's going on.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("runbenchmark")
        .setDescription("Run a 3DMark Timespy to help determine the issue")
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
