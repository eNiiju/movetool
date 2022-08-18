import { Guild } from 'discord.js';
import Logger from '../modules/Logger';
import Database from '../modules/Database';
import { Event } from '../types';

export default {
    name: 'guildDelete',
    handler(client, commands, guild: Guild) {
        Logger.info(`Client left '${guild.name}'`);
        // Remove the guild logs from the database
        Database.deleteCollection(guild.id);
    }
} as Event;
