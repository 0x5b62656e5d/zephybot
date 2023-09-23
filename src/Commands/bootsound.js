const string = "### Easy way:\nIn GHelper, open the `Extra` menu, and at the bottom, uncheck the `Boot Sound` option.\n### Complicated way:\nBoot into BIOS (While laptop is turing on from a shutdown or reboot, keep mashing the `F2` button until you enter BIOS). Press `F7` for `Advanced Mode`. Navigate to the `Boot` menu, then select an entry that has something like \"Animation post-logo configuration\" or something like that. You should see a boot sound option. Disable it, then save and reboot.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Disabling laptop boot sound\n${string}`);
};

module.exports.name = "bootSound";