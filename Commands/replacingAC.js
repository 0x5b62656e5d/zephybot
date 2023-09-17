const string = "Q: *How do I uninstall AC?*\nA: Go to the AC install page and scroll down. Click around and you'll find the uninstaller. You should also uninstall MyAsus.\n\nQ: *Why should I use the uninstaller and not control panel? And should I use 3rd party like Revo?*\nA: The uninstaller makes sure that all files have been properly removed. Uninstallation via control panel may leave some files behind. You should also uninstall MyAsus. And no, you shouldn't use Revo. Just use the Asus uninstaller.\n\nQ: *Why should I replace AC with GHelper?*\nA: AC is a badly designed app. It's heavy, takes up lots of ram, and is buggy/laggy at times. GHelper, on the other hand, can do most, if not, everything that AC does, and uses much less ram, and is much more efficient. GHelper also has more configurability and functionality, with a much cleaner UI.\n\nNote: If the uninstaller fails, keep running it until it succeeds.\n\nThen grab GHelper from https://github.com/seerge/g-helper/releases/latest";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Replacing AC\n${string}`);
};

module.exports.name = "replacingAC";