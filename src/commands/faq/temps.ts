import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";

const string = "# Temps\n\nQ: *My CPU is at 95C! My GPU is at 82C!*\nA: These temps are perfectly fine; the chips are designed to run at these temps (CPU < 98-99C, GPU < 84-86C). AMD/Intel and Nvidia have implemented safety mechanisms: the hardware will automatically throttle if it reaches dangerous temps.\n\nQ: *Is there anything I can do to improve the temps?*\nA: You can elevate the laptop for better airflow, or get a cooling pad. Usually, you shouldn't really have to repaste unless the laptop's pretty old or if there's a problem with stock LM/paste.\n\nQ: *Can I use my laptop closed?*\nA: It's not recommended to use the laptop closed. The laptop also dissipates heat from the keyboard, and closing it while using the laptop may trap the heat inside, causing damage to certain components.\n\nQ: *Can I use my laptop on my bed or cloth surfaces?*\nA: No, don't use your laptop on your bed. The cloth/soft surface may clog up the vents and \"choke\" the laptop. Use it on hard surfaces like wood or plastic.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("temps")
        .setDescription("Laptop temperatures")
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
