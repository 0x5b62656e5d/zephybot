module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;

    const data = interaction.customId.split('.');

    if (data[0] === 'delMsg' && interaction.user.id === data[1]) {
        if (!interaction.message.channel) {
            try {
                const channel = await client.channels.fetch(interaction.message.channelId);
                interaction.message.channel = channel;
            } catch (error) {
                console.error("Failed to fetch channel: ", error);
                return interaction.reply({ content: `Failed perform this action`, ephemeral: true });
            }
        }

        interaction.message.delete();
    } else {
        interaction.reply({ content: `You can't perform this action`, ephemeral: true });
    }
};