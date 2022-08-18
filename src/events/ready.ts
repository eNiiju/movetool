import { Client } from 'discord.js';
import Logger from '../modules/Logger';
import { Event } from '../types';

export default {
    name: 'ready',
    handler(client) {
        Logger.info(`Logged in as 🚀 ${client.user?.tag}`);
    }
} as Event;
