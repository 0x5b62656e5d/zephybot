import { Events, Message } from "discord.js";

const string =
    "Run a [3DMark demo](<https://store.steampowered.com/app/223850/3DMark/>) benchmark and send screenshots of all the graphs and the results screen. This may help us determine what's going on.";

module.exports = {
    name: Events.MessageCreate,
    eventTitle: "Benchmark request",
    async execute(message: Message) {
        if (message.author.bot) {
            return;
        }

        message
            .fetchReference()
            .then(ref => {
                if (ref && message.content.toLowerCase().includes("3dmark")) {
                    message.reply({
                        content: `<@${ref.author.id}>\n${string}`,
                    });
                } else {
                    return;
                }
            })
            .catch(error => {
                return;
            });
    },
};
