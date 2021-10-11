/**
 * @file            ready.ts
 * @author          Niiju
 * @description     Event handler file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { Client } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { debugGuildId } from '../config';
import { setGuildCommands, setCommands } from '../lib/commandsLib';
import { ready } from '../modules/AppLogger';
import { GlobalData_t, Event_t } from '../types';

/* ------------------------------------------------------------------------- */
/*                             Event properties                              */
/* ------------------------------------------------------------------------- */

/**
 * Event's name.
 */
const name = 'ready';

/**
 * Function to execute when the event is fired at the client.
 * @param {Client} client The client
 * @param {GlobalData_t} g_data Container for the data used accross all files of the project
 */
async function handler(client: Client, g_data: GlobalData_t) {
    ready(`${client.user.tag} is ready!`);

    // Retrieve command data
    const slashCommands = Array.from(g_data.slashCommands.values()).map(c => c.data);
    const contextMenuCommand = Array.from(g_data.contextMenuCommands.values()).map(c => c.data);
    const commands = [...slashCommands, ...contextMenuCommand];

    // Update slash commands globally
    ////await setCommands(client, commands);

    // Update slash commands for the debug guild
    await setGuildCommands(client, commands, debugGuildId);
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default { name, handler } as Event_t;
