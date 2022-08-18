import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js';
import { getSubCommand, getSubCommands } from '../../lib/commands';
import { ChatInputCommand } from '../../types';

export default {
    name: 'enable',
    description: 'Commands for enabling Movetool features.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['Administrator'],
    dmPermission: false,
    options: getSubCommands('enable'),
    execute(client, interaction: ChatInputCommandInteraction) {
        getSubCommand(interaction).execute(client, interaction);
    }
} as ChatInputCommand;
