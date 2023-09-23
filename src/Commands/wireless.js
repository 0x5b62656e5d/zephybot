const { EmbedBuilder } = require('discord.js');

const string = "If you have wireless issues, you could try performing an `NVRAM Reset` (run `?nvram`).\nIf the issue still persists and your laptop has the Mediatek wireless card, I suggest swapping it out to an Intel AX210.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Connectivity issues\n${string}`);
};

module.exports.name = "wireless";