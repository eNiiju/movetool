/**
 * @file            types.ts
 * @author          Niiju
 * @description     Different custom types used across the project. 
 */

/* ------------------------------------------------------------------------- */
/*                               Node modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, Collection, CommandInteraction, PermissionString } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                               Type exports                                */
/* ------------------------------------------------------------------------- */

/**
 * Type for the container storing the data used accross all files of the project.
 */
export type GlobalData_t = {
    slashCommands: Collection<string, SlashCommand_t>;
    contextMenuCommands: Collection<string, ContextMenu_t>;
};

/**
 * Type for event handler files.
 */
export type Event_t = {
    name: string;
    handler(client: Client, g_data: GlobalData_t, ...args: any[]): void;
};

/**
 * Type for a slash command : "Top level command".
 */
export type SlashCommand_t = {
    data: {
        name: string;
        description: string;
        options: ApplicationCommandOption[];
    };
    verify(client: Client, interaction: CommandInteraction): boolean;
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
};

/**
 * Type for a subcommand group : First child of a slash command.
 */
export type SubcommandGroup_t = {
    data: {
        type: 'SUB_COMMAND_GROUP';
        name: string;
        description: string;
        options: any[];
    };
    verify(client: Client, interaction: CommandInteraction): boolean;
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
};

/**
 * Type for a subcommand : First or second child of a slash command.
 * Can be the first child of a subcommand group too.
 */
export type Subcommand_t = {
    data: {
        type: 'SUB_COMMAND';
        name: string;
        description: string;
        options: any[];
    };
    verify(client: Client, interaction: CommandInteraction): boolean;
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
};

/**
 * Type for a context menu command.
 */
export type ContextMenu_t = {
    data: {
        type: 'USER' | 'MESSAGE';
        name: string;
    };
    verify(client: Client, interaction: CommandInteraction): boolean;
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
}

/**
 * Type for informations about a command.
 */
export type CommandInfos_t = {
    dmAllowed: boolean;
    clientPermissions: PermissionString[];
};
