import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";
import { commandsList } from "../../index";
import { EmbedPagination } from "../../util/embedpagination";

const zephybotPfp = `https://cdn.discordapp.com/avatars/1151023270636818483/e0fb09065c262cd885289203bb4219f6.webp?size=1024&width=0&height=230`;
const pepperPfp = `https://cdn.pepper.fyi/pfp.png`;

const PAGES = 6;

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("What commands are available?"),
    async execute(interaction: CommandInteraction) {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const commands = commandsList.map(command => {
            return `**/${command.name}**\n${command.description}`;
        });

        const totalPages = Math.ceil(commands.length / PAGES);
        const embedPages = [];

        for (let i = 0; i < totalPages; i++) {
            const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Help")
                .setDescription("List of commands for the bot")
                .setAuthor({ name: "Zephybot", url: "https://github.com/0x5b62656e5d/zephybot" })
                .setThumbnail(zephybotPfp)
                .addFields({
                    name: "Help",
                    value: commands.slice(i * PAGES, i * PAGES + PAGES).join("\n\n"),
                })
                .setTimestamp()
                .setFooter({ text: "Created by pepper", iconURL: pepperPfp });
            embedPages.push(embed);
        }

        try {
            await interaction.deferReply();
            await EmbedPagination(interaction, embedPages, 30 * 1000, [row]);
        } catch (error) {
            console.error(`help.ts\n${error}`);
            await interaction.editReply({
                content: "An error occurred while sending the help command.",
                components: [],
            });
        }
    },
};
