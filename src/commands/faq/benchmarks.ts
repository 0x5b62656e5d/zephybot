import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Common benchmark tools\n\n### Basic (CPU & GPU)\n3DMark - <https://www.3dmark.com/> /  <https://store.steampowered.com/app/223850/3DMark/> (*Demo*)\n\n### More advanced benchmark tools\n\n- CPU\nAIDA64 - <https://www.aida64.com/downloads>\nCinebench - <https://www.maxon.net/en/downloads/>\n\n- GPU\nAIDA64 - <https://www.aida64.com/downloads>\nFurmark - <https://geeks3d.com/furmark/>\nHeaven, Valley, Superposition - <https://benchmark.unigine.com/>\n\n- Combined\nAIDA64 - <https://rentry.org/stresstest> (*How-to*)";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("benchmarks")
        .setDescription("List of common & recommended benchmarks")
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
