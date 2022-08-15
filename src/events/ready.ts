import { Client } from 'discord.js';
import Logger from '../modules/Logger';
import { Event } from '../types';

export default {
    name: 'ready',
    handler(client: Client) {
        Logger.ready(`🚀 Logged in as ${client.user?.tag}`);
    }
} as Event;
