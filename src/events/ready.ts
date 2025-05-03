import { Events } from 'discord.js';
import { CommandClient } from '../wrappers/CommandClient';

module.exports = {
	name: Events.ClientReady,
	eventTitle: "Client ready",
	once: true,
	execute(client: CommandClient) {
		if (client.user) {
			console.info(`Zephybot is awake :>`);
			console.info(`User tag: ${client.user.tag}`);
		} else {
			console.error('Client user is null.');
		}
	},
};