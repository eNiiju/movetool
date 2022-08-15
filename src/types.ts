import { ApplicationCommandData, ApplicationCommandOption, ApplicationCommandOptionType, ApplicationCommandType, Client, Collection, Interaction } from 'discord.js';

export interface Event {
    name: string;
    handler: (client: Client, commands: Commands, ...args: any[]) => void;
}

export interface Commands {
    chatInput: Collection<string, ChatInputCommand>;
    contextMenu: Collection<string, ContextMenuCommand>;
}

export type ChatInputCommand = ApplicationCommandData & {
    type: ApplicationCommandType.ChatInput;
    execute: (client: Client, interaction: Interaction) => void;
};

export type ContextMenuCommand = ApplicationCommandData & {
    type: ApplicationCommandType.User | ApplicationCommandType.Message;
    execute: (client: Client, interaction: Interaction) => void;
};

export type ChatInputSubCommand = ApplicationCommandOption & {
    type: ApplicationCommandOptionType.Subcommand;
    execute: (client: Client, interaction: Interaction) => void;
};

export type ChatInputSubCommandGroup = ApplicationCommandOption & {
    type: ApplicationCommandOptionType.SubcommandGroup;
    execute: (client: Client, interaction: Interaction) => void;
};
