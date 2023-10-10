const string = "Q: *My CPU is at 95C. Is this dangerous?*\nA: No, your CPU is fine. As long as it stays under 100, you're fine. Spikes shouldn't be concerning. If it's staying at temps over 100 ***constantly/for a while***, that's when you should be concerned.\n\nQ: *My GPU is at 83C. It's too hot!*\nA: No, your GPU is fine. As long as it stays under 85, you're fine. Similar to above, if it's staying at temps over 85 ***constantly/for a while***,that's when you should be concerned.\n\nNote: Laptops, especially these performance laptops, are designed to run at these temps. There are safety mechanisms implemented: the hardware in the machine will throttle by itself if it reaches high temps. There isn't really anything to worry about if CPU is under 100 and GPU is under 85.\n\nQ: *Is there anything I can do to improve the temps?*\nA: You can elevate the laptop for better airflow, or get a cooling pad. Usually, you shouldn't really have to repaste unless the laptop's pretty old or if there's a problem with stock LM/paste.\n\nnote: Personally I don't suggest using the laptop closed. If you're just doing light tasks (word, browsing), you prolly could get away with using it closed but if it starts to heat up, open it. By open, I mean open it at least 90 deg. I used to have it open at 45deg and guess what? I have a slightly curved screen from all the heat from the vents :)";

module.exports = {
    data: {
        name: 'temps',
        description: 'Laptop temperatures FAQ',
    },
 
    run: ({ interaction, client, handler }) => {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);
        
        const row = new ActionRowBuilder()
			.addComponents(delMsg);
        
        interaction.reply({
            content: `# Temps\n${string}`,
            components: [row],
        });
    },
};