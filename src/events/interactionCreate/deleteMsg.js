module.exports = (interaction, client) => {
    if (!interaction.isButton()) return;

    const data = interaction.customId.split('.');
    if (data[0] === 'delMsg' && interaction.user.id === data[1]) {
        interaction.message.delete();
    } else {
        interaction.reply({ content: `You can't perform this action`, ephemeral: true });
    }
};