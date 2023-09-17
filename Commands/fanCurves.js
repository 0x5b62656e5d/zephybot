const string = "When you're gaming, you typically shouldn't need `Turbo`. `Balanced` fan curve should be enough\nSecondly, you shouldn't need to do custom fan curves either. Stock fan curves in GHelper should be enough.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Fan curves\n${string}`);
};

module.exports.name = "fanCurves";