import { Client } from 'discord.js';
import Logger from '../modules/Logger';
import { Event } from '../types';

export default {
    name: 'shardError',
    handler(client, commands, error: Error) {
        Logger.debug(error.message);
    }
} as Event;
