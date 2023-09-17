module.exports.run = (client, message, args) => {
    client.users.send('936640230272942091', args.slice(0).join(" ") + ` - Sent by ${message.author}`);
    message.channel.send(`${message.author} - Reminder sent to pepper`);
};

module.exports.name = "toAdd";