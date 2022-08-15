import 'dotenv/config';
import { readdirSync } from 'node:fs';
import { ApplicationCommandData, Client } from 'discord.js';
import config from './config';
import { getGuildById } from './lib/util';

const client = new Client(config.clientOptions);
const token = process.env.TOKEN;
const debugMode = process.argv.includes('--debug');
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
    if (debugMode) await getGuildById(client, config.debug.guildId)?.commands.set(commands);
    else await client.application?.commands.set(commands);

    console.log(`[${debugMode ? 'DEBUG MODE' : 'PRODUCTION MODE'}] Commands registered.`);
    client.destroy();
});

client.login(token);
