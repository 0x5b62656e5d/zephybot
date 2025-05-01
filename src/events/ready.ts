import { Events } from 'discord.js';
import { CommandClient } from '../wrappers/CommandClient';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: CommandClient) {
		if (client.user) {
			console.log(`Zephybot is awake :>`);
			console.log(`User tag: ${client.user.tag}`);
		} else {
			console.error('Client user is null.');
		}
	},
};