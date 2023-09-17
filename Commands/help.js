const { EmbedBuilder } = require('discord.js');
const pepperPFP = 'https://cdn.discordapp.com/avatars/936640230272942091/a0be65d35ac528df69b1f4189b2fe621.webp?size=1024&width=0&height=230';
const zephybotPFP = 'https://cdn.discordapp.com/avatars/1151023270636818483/e0fb09065c262cd885289203bb4219f6.webp?size=1024&width=0&height=230';

module.exports.run = (client, message, args) => {
    if (args.slice(0).join("") === "toAdd") {
        return message.channel.send("Sends a reminder to pepper to update something about the bot\nUsage: `?toAdd Add more info in replacingAC section`");
    }
    const commands = client.commands.map(command => "- " + command.name).join("\n");
    const embed = new EmbedBuilder()
	    .setColor(0x0099FF)
	    .setTitle("Help")
	    .setAuthor({ name: 'Zephybot', url: 'https://0x5b62656e5d.github.io/persona-website' })
	    .setDescription('List of commands for Zephybot')
	    .setThumbnail(zephybotPFP)
	    .addFields({ name: 'Commands', value: commands })
	    .setTimestamp()
	    .setFooter({ text: 'Created by pepper', iconURL: pepperPFP });

    message.channel.send({ embeds: [embed] });
};

module.exports.name = "help";