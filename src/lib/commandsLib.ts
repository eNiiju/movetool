/**
 * @file            commandsLib.ts
 * @author          Niiju
 * @description     Collection of functions about application commands
 */

/* ------------------------------------------------------------------------- */
/*                               Node modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandData, ApplicationCommandOption, Client, CommandInteraction, PermissionString } from 'discord.js';
import { readdirSync } from 'fs';
import { CommandInfos_t, SubcommandGroup_t, Subcommand_t } from '../types';
import { simpleEmbedMessage } from './messageLib';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { getGuildById, getMemberById } from './util';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

/**
 * Sets commands for a guild.
 * @param {Client} client The client
 * @param {ApplicationCommandData[]} commands The commands
 * @param {string} debugGuildId The guild's id
 */
async function setGuildCommands(client: Client, commands: ApplicationCommandData[], debugGuildId: string) {
    await getGuildById(client, debugGuildId).commands.set(commands);
}

/**
 * Sets commands globally. Takes at most 1 hour to appear on all servers.
 * @param {Client} client The client
 * @param {ApplicationCommandData[]} commands The commands
 */
async function setCommands(client: Client, commands: ApplicationCommandData[]) {
    await client.application.commands.set(commands);
}

/**
 * Returns the options of a command's first childs (subcommand groups or subcommands)
 * @param {string} commandName The name of the command (without the extension of the file)
 * @return Options of the command's first childs subcommand groups or subcommands
 */
function getFirstChildsOptions(commandName: string): ApplicationCommandOption[] {
    let options: ApplicationCommandOption[] = [];
    const files = readdirSync(`${__dirname}/../commands/slash`).filter(
        f => f.endsWith('.js') && f.startsWith(`${commandName} `) && !f.slice(`${commandName} `.length).includes(' ')
    );

    for (const file of files) {
        let firstChildCommand: Subcommand_t | SubcommandGroup_t = require(`${__dirname}/../commands/slash/${file}`).default;
        options.push(firstChildCommand.data);
    }
    return options;
}

/**
 * Returns the subcommand used from a command interaction.
 * The interaction must have a subcommand.
 * @param {CommandInteraction} interaction The command interaction
 * @return {Subcommand_t | null} The subcommand used or `null` if it's not a subcommand interaction
 */
function getSubcommand(interaction: CommandInteraction): Subcommand_t | null {
    if (!interaction.options.getSubcommand(false)) return null;

    let names: string[] = [interaction.commandName];
    const subcommandGroupName = interaction.options.getSubcommandGroup(false);
    const subcommandName = interaction.options.getSubcommand();

    if (subcommandGroupName) names.push(subcommandGroupName);
    names.push(subcommandName);

    const file = names.join(' ');
    const subcommand: Subcommand_t = require(`../commands/slash/${file}`).default;

    return subcommand;
}

/**
 * Verifies if a command can be executed by testing if the client (bot) has the
 * correct permissions and if the command can be used inside a DM channel.
 * If the verification fails, it will send a reply to the interaction.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The command interaction
 * @param {CommandInfos_t} infos The informations about the command
 * @return {boolean} `true` If everything is OK, `false` if not
 */
function verifyCommand(client: Client, interaction: CommandInteraction, infos: CommandInfos_t): boolean {
    // DM channels not allowed
    if (!interaction.guildId && !infos.dmAllowed) {
        interaction.reply(simpleEmbedMessage('❌ Not a DM command', 'Sorry, this command is only available in servers.', '#ff7675'));
        return false;
    }

    // Missing client permissions
    const memberPermissions = getMemberById(interaction.guild, client.user.id).permissions;
    let missingPermissions: PermissionString[] = [];
    for (const permission of infos.clientPermissions) if (!memberPermissions.has(permission)) missingPermissions.push(permission);
    if (missingPermissions.length > 0) {
        simpleEmbedMessage(
            '❌ Missing permissions',
            `Sorry, I don't have the right permissions to do that. \nI need : \`${missingPermissions.join('` `')}\``,
            '#ff7675'
        );
        return false;
    }

    return true;
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export { setGuildCommands, setCommands, getFirstChildsOptions, getSubcommand, verifyCommand };
