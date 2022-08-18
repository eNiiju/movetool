import { ChatInputCommandInteraction } from 'discord.js';
import { readdirSync } from 'node:fs';
import { ChatInputSubCommand } from '../types';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

function getSubCommand(interaction: ChatInputCommandInteraction): ChatInputSubCommand {
    const commandName = interaction.commandName;
    const subCommandName = interaction.options.getSubcommand();
    const subCommandGroup = interaction.options.getSubcommandGroup();
    
    const path = `${__dirname}/../commands/chatInput/${commandName}/${subCommandGroup ?? ''}`;
    return require(`${path}/${subCommandName}`).default;
}

function getSubCommands(commandName: string): ChatInputSubCommand[] {
    let subCommands: ChatInputSubCommand[] = [];
    const path = `${__dirname}/../commands/chatInput/${commandName.split(' ').join('/')}`;

    readdirSync(path)
        .filter(file => file.endsWith('.js'))
        .forEach(fileName => subCommands.push(require(`${path}/${fileName}`).default));
    return subCommands;
}

/* ------------------------------------------------------------------------- */
/*                                  Exports                                  */
/* ------------------------------------------------------------------------- */

export { getSubCommand, getSubCommands };
