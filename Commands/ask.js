const string = "Don't ask to ask. Just ask your question. Asking \"Does anyone have a Strix?\" or \"Does anyone have a X13?\" isn't going to help you.\n\nThis is an example of a good question: \"My 6700s G14 keeps suddenly freezing when I launch a game. Why does this happen?\"";

module.exports.run = (client, message, args) => {
    message.channel.send(`${string}`);
};

module.exports.name = "ask";