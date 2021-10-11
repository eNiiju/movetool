/**
 * @file            index.ts
 * @author          Niiju
 * @description     Main file
 */

/* ------------------------------------------------------------------------- */
/*                               Node modules                                */
/* ------------------------------------------------------------------------- */

import { Client, Collection } from 'discord.js';
import { readdirSync } from 'node:fs';
import 'dotenv/config';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { intents, partials } from './config';
import { ContextMenu_t, Event_t, GlobalData_t, SlashCommand_t } from './types';

/* ------------------------------------------------------------------------- */
/*                             Global variables                              */
/* ------------------------------------------------------------------------- */

const token: string = process.env.BOT_TOKEN;
const client: Client = new Client({ intents, partials });

// Container storing the data used accross all files of the project
const g_data: GlobalData_t = {
    slashCommands: new Collection<string, SlashCommand_t>(),
    contextMenuCommands: new Collection<string, ContextMenu_t>()
};

/* ------------------------------------------------------------------------- */
/*                                   Setup                                   */
/* ------------------------------------------------------------------------- */

// Fetch & store slash commands (Top level commands)
const slashCommandFiles = readdirSync(`${__dirname}/commands/slash`).filter(f => f.endsWith('.js') && !f.includes(' '));
for (const file of slashCommandFiles) {
    const slashCommand: SlashCommand_t = require(`./commands/slash/${file}`).default;
    g_data.slashCommands.set(slashCommand.data.name, slashCommand);
}

// Fetch & store context menu commands
const contextMenuCommandsFiles = readdirSync(`${__dirname}/commands/contextMenu`).filter(f => f.endsWith('.js'));
for (const file of contextMenuCommandsFiles) {
    const contextMenuCommand: ContextMenu_t = require(`./commands/contextMenu/${file}`).default;
    g_data.contextMenuCommands.set(contextMenuCommand.data.name, contextMenuCommand);
}

// Fetch & set event handlers for their corresponding event name
const eventFiles = readdirSync(`${__dirname}/events`).filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
    const event: Event_t = require(`./events/${file}`).default;
    client.on(event.name, event.handler.bind(null, client, g_data));
}

// Start the bot!
client.login(token);
