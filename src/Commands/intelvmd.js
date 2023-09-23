const string = "While clean installing Windows, you disabled VMD, and you performed a BIOS update and it now refuses to boot, the BIOS update has re-enabled VMD. Go to BIOS then disable it. Your laptop should boot normally now.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Laptop not booting (***INTEL ONLY***)\n${string}`);
};

module.exports.name = "intelvmd";