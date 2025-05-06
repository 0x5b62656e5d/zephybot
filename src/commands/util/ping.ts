import { CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import config from "../../util/config";
import { getFileBaseName } from "../../util/filebasename";

const commandEntry = config.bot.commands.COMMAND_MAP[getFileBaseName(__filename)];

module.exports = {
    data: new SlashCommandBuilder()
		.setName(commandEntry.name)
		.setDescription(commandEntry.description),
    async execute(interaction: CommandInteraction) {
        interaction.reply({
            content: `:ping_pong: Pong! ${interaction.client.ws.ping}ms`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
