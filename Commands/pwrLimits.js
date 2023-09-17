const string = "I strongly suggest ***against*** undervolting or setting any sort of power limits for your CPU. If you dont wan't your laptop to get that hot, reduce the `CPU Temp Limit` setting. This will change when the CPU will start to throttle. It will affect your performance, however, will be more effective at reducing temps compared to undervolting.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Power limits\n${string}`);
};

module.exports.name = "pwrLimits";