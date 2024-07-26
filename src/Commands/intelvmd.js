// const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

// const string = "# Laptop not booting (***INTEL ONLY***)\nWhile clean installing Windows, you disabled VMD, and you performed a BIOS update and it now refuses to boot, the BIOS update has re-enabled VMD. Go to BIOS then disable it. Your laptop should boot normally now.";

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('intelvmd')
//         .setDescription('Potential solution to laptop not booting (INTEL ONLY)')
//         .addUserOption(option => option.setName('target').setDescription('User to tag')),
 
//     run: ({ interaction, client, handler }) => {
//         const delMsg = new ButtonBuilder()
//             .setCustomId(`delMsg.${interaction.user.id}`)
//             .setLabel('Delete')
//             .setStyle(ButtonStyle.Danger);
        
//         const row = new ActionRowBuilder()
// 			.addComponents(delMsg);
        
//         if (interaction.options.getUser('target') === null) {
//             return interaction.reply({
//                 content: `${string}`,
//                 components: [row],
//             });
//         }
        
//         interaction.reply({
//             content: `*Suggestion for <@${interaction.options.getUser('target').id}>*\n${string}`,
//             components: [row],
//         });
//     },
// };