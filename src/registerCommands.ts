import 'dotenv/config';
import { readdirSync } from 'node:fs';
import { ApplicationCommandData, Client } from 'discord.js';
import config from './config';
import Logger from './modules/Logger';
import { getGuildById } from './lib/util';

const setDebugFlag = process.argv.includes('--set-debug');
const unsetDebugFlag = process.argv.includes('--unset-debug');
const client = new Client(config.clientOptions);
const token = process.env.TOKEN;
const commandTypes = ['chatInput', 'contextMenu'];
const commands: ApplicationCommandData[] = [];

// Retrieve commands data
for (const commandType of commandTypes) {
    readdirSync(`${__dirname}/commands/${commandType}`)
        .filter(file => file.endsWith('.js'))
        .forEach(fileName => {
            commands.push(require(`./commands/${commandType}/${fileName}`).default);
        });
}

// When the bot is ready, set the commands
client.on('ready', async () => {
    if (setDebugFlag) {
        await getGuildById(client, config.debug.guildId)?.commands.set(commands);
        Logger.debug('Debug commands set.');
    } else if (unsetDebugFlag) {
        await getGuildById(client, config.debug.guildId)?.commands.set([]);
        Logger.debug('Debug commands unset.');
    } else {
        await client.application?.commands.set(commands);
        Logger.info('Commands registered');
    }

    client.destroy();
});

client.login(token);
