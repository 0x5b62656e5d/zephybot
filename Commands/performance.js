const string = "Q: *My laptop's slowing down. Why?*\nA: There are a few possibilities.\n- Keep at least 20-25% of your drive free (if your drive has a capacity of 1TB, keep at least 200-250gb free)\n- Did you install a virus? Perhaps an app that's eating up your resources? (Salad is one example)";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Performance\n${string}`);
};

module.exports.name = "performance";