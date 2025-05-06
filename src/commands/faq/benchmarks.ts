import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from "discord.js";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";

const commandEntry = config.bot.commands.COMMAND_MAP[getFileBaseName(__filename)];

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commandEntry.name)
        .setDescription(commandEntry.description)
        .addUserOption(option =>
            option
                .setName(commandEntry.options[0].name)
                .setDescription(commandEntry.options[0].description)
                .setRequired(commandEntry.options[0].required)
        ),
    async execute(interaction: CommandInteraction) {
        const delMsg = new ButtonBuilder()
            .setCustomId(`delMsg.${interaction.user.id}`)
            .setLabel("Delete")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(delMsg);

        const target = (interaction.options as CommandInteractionOptionResolver).getUser(
            commandEntry.options[0].name
        );

        if (target) {
            return interaction.reply({
                content: `*Suggestion for <@${target.id}>*\n${commandEntry.string}`,
                components: [row],
            });
        }

        interaction.reply({
            content: `${commandEntry.string}`,
            components: [row],
        });
    },
};
