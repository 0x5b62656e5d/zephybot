import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";
import { database } from "../../index";
import { TodoDatabase } from "../../wrappers/types/TodoDatabase";

const zephybotPfp = `https://cdn.discordapp.com/avatars/1151023270636818483/e0fb09065c262cd885289203bb4219f6.webp?size=1024&width=0&height=230`;
const pepperPfp = `https://cdn.pepper.fyi/pfp.png`;

module.exports = {
    data: new SlashCommandBuilder().setName("todolist").setDescription("List of todos"),
    async execute(interaction: CommandInteraction) {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const todos = database.prepare(`SELECT * FROM todo`).all() as TodoDatabase[];
        const todoList = todos.map(todo => {
            if (todo.hash !== "testhash") {
                return `**\`${todo.hash}\`** - ${todo.title}\n${todo.description}`;
            }
        });

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Todo List")
            .setDescription("List of todos for the bot")
            .setAuthor({ name: "Zephybot", url: "https://github.com/0x5b62656e5d/zephybot" })
            .setThumbnail(zephybotPfp)
            .addFields({ name: "Todos", value: todoList.join(" \n- ") })
            .setTimestamp()
            .setFooter({ text: "Created by pepper", iconURL: pepperPfp });

        interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
};
