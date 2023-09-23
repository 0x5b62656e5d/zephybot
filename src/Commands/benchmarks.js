const string = "### Basic (CPU & GPU)\n3DMark - <https://www.3dmark.com/> /  <https://store.steampowered.com/app/223850/3DMark/> (*Demo*)\n\n### More advanced benchmark tools\n\n- CPU\nAIDA64 - <https://www.aida64.com/downloads>\nCinebench - <https://www.maxon.net/en/downloads/>\n\n- GPU\nAIDA64 - <https://www.aida64.com/downloads>\nFurmark - <https://geeks3d.com/furmark/>\nHeaven, Valley, Superposition - <https://benchmark.unigine.com/>\n\n- Combined\nAIDA64 - <https://rentry.org/stresstest> (*How-to*)\n\nHowever, I suggest just sticking to 3DMark, as it provides a pretty detailed benchmark analysis that can be easily understood by everyone.";

module.exports.run = (client, message, args) => {
    message.channel.send(`# Common benchmark tools\n${string}`);
};

module.exports.name = "benchmarks";