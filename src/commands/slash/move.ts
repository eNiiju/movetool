/**
 * @file            move.ts
 * @author          Niiju
 * @description     Slash command file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, CommandInteraction } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { getFirstChildsOptions, getSubcommand } from '../../lib/commandsLib';
import { SlashCommand_t } from '../../types';

/* ------------------------------------------------------------------------- */
/*                            Command properties                             */
/* ------------------------------------------------------------------------- */

/**
 * Command's name. (Visible on Discord)
 */
const name = 'move';

/**
 * Command's description. (Visible on Discord)
 */
const description = 'Moving commands.';

/**
 * Command's options.
 */
const options: ApplicationCommandOption[] = getFirstChildsOptions(
    __filename
        .split(/[\\/]/)
        .pop()
        .replace(/\.[^/.]+$/, '')
);

/**
 * Verifies if the command can be executed.
 * Side effect : will reply to the interaction with an error message
 * if the verification fails.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The command interaction
 * @return {boolean} `true` If everything is OK, `false` if not
 */
function verify(client: Client, interaction: CommandInteraction): boolean {
    return getSubcommand(interaction).verify(client, interaction);
}

/**
 * Function to execute when the command is used.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The command interaction
 */
async function execute(client: Client, interaction: CommandInteraction) {
    getSubcommand(interaction).execute(client, interaction);
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default {
    data: { name, description, options },
    verify,
    execute
} as SlashCommand_t;
