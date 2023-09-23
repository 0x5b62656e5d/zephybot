module.exports.run = (client, message, args) => {
  	if (message.author.id === '936640230272942091') {
    	return message.channel.send(`# pong   🏓\n${Date.now() - message.createdTimestamp}ms`);
  	} else {
    	return message.channel.send("You don't have the permissions to run `?ping`");
  	}
};

module.exports.name = "ping";