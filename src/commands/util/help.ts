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
import config from "../../util/config";

const cmdPerPage = config.bot.commands.COMMANDS_PER_HELP_PAGE;

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

        const totalPages = Math.ceil(commands.length / cmdPerPage);
        const embedPages = [];

        for (let i = 0; i < totalPages; i++) {
            const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Help")
                .setDescription("List of commands for the bot")
                .setAuthor({ name: "Zephybot", url: "https://github.com/0x5b62656e5d/zephybot" })
                .setThumbnail(config.bot.commands.BOT_PFP)
                .addFields({
                    name: "Help",
                    value: commands.slice(i * cmdPerPage, i * cmdPerPage + cmdPerPage).join("\n\n"),
                })
                .setTimestamp()
                .setFooter({ text: "Created by pepper", iconURL: config.bot.commands.DEV_PFP });
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
