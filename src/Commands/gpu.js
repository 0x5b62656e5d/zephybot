const string = "Q: *Geforce experience says I'm not able to update my graphics drivers. Why? My GPU's fine!*\nA: Are you on eco? If so, switch to optimized or standard.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# GPU\n${string}`);
};

module.exports.name = "gpu";