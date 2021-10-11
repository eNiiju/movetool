/**
 * @file            interactionCreate.ts
 * @author          Niiju
 * @description     Event handler file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { Client, Interaction } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { GlobalData_t, Event_t } from '../types';

/* ------------------------------------------------------------------------- */
/*                             Event properties                              */
/* ------------------------------------------------------------------------- */

/**
 * Event's name.
 */
const name = 'interactionCreate';

/**
 * Function to execute when the event is fired at the client.
 * @param {Client} client The client
 * @param {GlobalData_t} g_data Container for the data used accross all files of the project
 * @param {Interaction} interaction The interaction which was created
 */
async function handler(client: Client, g_data: GlobalData_t, interaction: Interaction) {
    // Slash command interaction
    if (interaction.isCommand()) {
        const slashCommand = g_data.slashCommands.get(interaction.commandName);
        if (slashCommand.verify(client, interaction)) slashCommand.execute(client, interaction);
    }
    // Context menu application
    if (interaction.isContextMenu()) {
        const contextMenuCommand = g_data.contextMenuCommands.get(interaction.commandName);
        if (contextMenuCommand.verify(client, interaction)) contextMenuCommand.execute(client, interaction);
    }
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default { name, handler } as Event_t;
