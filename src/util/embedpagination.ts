import {
    ActionRowBuilder,
    ActionRowData,
    APIMessageTopLevelComponent,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    ComponentType,
    EmbedBuilder,
    JSONEncodable,
    MessageActionRowComponentBuilder,
    MessageActionRowComponentData,
    TopLevelComponentData,
} from "discord.js";

export const EmbedPagination = async (
    interaction: CommandInteraction,
    pages: EmbedBuilder[],
    time: number = 30 * 1000,
    components: (
        | JSONEncodable<APIMessageTopLevelComponent>
        | TopLevelComponentData
        | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder>
        | APIMessageTopLevelComponent
    )[]
) => {
    try {
        if (!interaction || !pages || !pages) {
            throw new Error("[PAGINATION] Invalid args");
        }

        if (pages.length === 1) {
            return await interaction.editReply({
                embeds: pages,
                components: components,
            });
        }

        let index = 0;

        const leftMost = new ButtonBuilder()
            .setCustomId("leftMost")
            .setLabel("<<")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const left = new ButtonBuilder()
            .setCustomId("left")
            .setLabel("<")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const right = new ButtonBuilder()
            .setCustomId("right")
            .setLabel(">")
            .setStyle(ButtonStyle.Primary);

        const rightMost = new ButtonBuilder()
            .setCustomId("rightMost")
            .setLabel(">>")
            .setStyle(ButtonStyle.Primary);

        const pageCounter = new ButtonBuilder()
            .setCustomId("pageCounter")
            .setLabel(`${index + 1}/${pages.length}`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents([
            leftMost,
            left,
            pageCounter,
            right,
            rightMost,
        ]);

        const msg = await interaction.editReply({
            embeds: [pages[index]],
            components: [buttons, ...(components ? components : [])],
        });

        const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: time,
        });

        collector.on("collect", async i => {
            if (i.user.id !== interaction.user.id) {
                return i.reply({
                    content: "You cannot use this button.",
                    ephemeral: true,
                });
            }

            await i.deferUpdate();

            if (i.customId === "leftMost") {
                index = 0;
                pageCounter.setLabel(`${index + 1}/${pages.length}`);
            } else if (i.customId === "left") {
                index = index > 0 ? --index : pages.length - 1;
                pageCounter.setLabel(`${index + 1}/${pages.length}`);
            } else if (i.customId === "right") {
                index = index < pages.length - 1 ? ++index : 0;
                pageCounter.setLabel(`${index + 1}/${pages.length}`);
            } else if (i.customId === "rightMost") {
                index = pages.length - 1;
                pageCounter.setLabel(`${index + 1}/${pages.length}`);
            }

            if (index === 0) {
                leftMost.setDisabled(true);
                left.setDisabled(true);
            } else {
                leftMost.setDisabled(false);
                left.setDisabled(false);
            }

            if (index === pages.length - 1) {
                rightMost.setDisabled(true);
                right.setDisabled(true);
            } else {
                rightMost.setDisabled(false);
                right.setDisabled(false);
            }

            await i
                .editReply({
                    embeds: [pages[index]],
                    components: [
                        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents([
                            leftMost.setDisabled(index === 0),
                            left.setDisabled(index === 0),
                            pageCounter.setLabel(`${index + 1}/${pages.length}`),
                            right.setDisabled(index === pages.length - 1),
                            rightMost.setDisabled(index === pages.length - 1),
                        ]),
                        ...(components ? components : []),
                    ],
                })
                .catch(error => {
                    if (error.code === 10008) {
                        console.info("[PAGINATION] Error (HANDLED): Message deleted");
                        return;
                    }

                    console.error("[PAGINATION] Error: ", error);
                    return;
                });

            collector.resetTimer();
        });

        collector.on("end", async (ollected, reason) => {
            if (reason === "messageDelete") {
                return;
            }

            await msg.edit({
                embeds: [pages[index]],
                components: [...(components ? components : [])],
            });
        });

        return msg;
    } catch (error) {
        console.error("[PAGINATION] Error: ", error);
        return;
    }
};
