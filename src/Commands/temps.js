const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const string = "# Temps\n\nQ: *My CPU is at 95C! My GPU is at 82C!*\nA: These temps are perfectly fine; the chips are designed to run at these temps (CPU < 98-99C, GPU < 84-86C). AMD/Intel and Nvidia have implemented safety mechanisms: the hardware will automatically throttle if it reaches dangerous temps.\n\nQ: *Is there anything I can do to improve the temps?*\nA: You can elevate the laptop for better airflow, or get a cooling pad. Usually, you shouldn't really have to repaste unless the laptop's pretty old or if there's a problem with stock LM/paste.\n\nQ: *Can I use my laptop closed?*\nA: It's not recommended to use the laptop closed. The laptop also dissipates heat from the keyboard, and closing it while using the laptop may trap the heat inside, causing damage to certain components.\n\nQ: *Can I use my laptop on my bed or cloth surfaces?*\nA: No, don't use your laptop on your bed. The cloth/soft surface may clog up the vents and \"choke\" the laptop. Use it on hard surfaces like wood or plastic.";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temps')
        .setDescription('Laptop temperatures FAQ')
        .addUserOption(option => option.setName('target').setDescription('User to tag')),
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        if (interaction.options.getUser('target') === null) {
            return interaction.reply({
                content: `${string}`,
                components: [row],
            });
        }

        interaction.reply({
            content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string}`,
            components: [row],
        });
    },
};