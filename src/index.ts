import 'dotenv/config';
import { readdirSync } from 'node:fs';
import { Client, Collection } from 'discord.js';
import config from './config';
import { Commands, ContextMenuCommand, Event, ChatInputCommand } from './types';

/* ------------------------------------------------------------------------- */
/*                             Global variables                              */
/* ------------------------------------------------------------------------- */

const client = new Client(config.clientOptions);
const token = process.env.TOKEN;

const commands: Commands = {
    chatInput: new Collection<string, ChatInputCommand>(),
    contextMenu: new Collection<string, ContextMenuCommand>()
};

/* ------------------------------------------------------------------------- */
/*                                   Setup                                   */
/* ------------------------------------------------------------------------- */

// Commands
for (const commandType in commands) {
    readdirSync(`${__dirname}/commands/${commandType}`)
        .filter(file => file.endsWith('.js'))
        .forEach(fileName => {
            const command = require(`${__dirname}/commands/${commandType}/${fileName}`).default;
            commands[commandType as keyof typeof commands].set(command.name, command);
        });
}

// Event handlers
readdirSync(`${__dirname}/events`)
    .filter(file => file.endsWith('.js'))
    .forEach(fileName => {
        const event: Event = require(`${__dirname}/events/${fileName}`).default;
        client.on(event.name, event.handler.bind(null, client, commands));
    });

client.login(token);
