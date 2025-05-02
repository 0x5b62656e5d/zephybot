import { Events } from 'discord.js';
import { CommandClient } from '../wrappers/CommandClient';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: CommandClient) {
		if (client.user) {
			console.info(`[INFO] Zephybot is awake :>`);
			console.info(`[INFO] User tag: ${client.user.tag}`);
		} else {
			console.error('[ERROR] Client user is null.');
		}
	},
};