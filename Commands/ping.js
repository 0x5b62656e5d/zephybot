module.exports.run = (client, message, args) => {
    message.channel.send(`# pong   🏓\n${Date.now() - message.createdTimestamp}ms`);
};
  
module.exports.name = "ping";