const string = "The laptop should be ***powered off*** to begin with. Hold power button for around 30 seconds. The laptop should turn on very briefly then shut off right after. Release the power button then boot the laptop.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# NVRAM reset\n${string}`);
};

module.exports.name = "nvram";