import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js';
import { getSubCommand, getSubCommands } from '../../lib/commands';
import { ChatInputCommand } from '../../types';

export default {
    name: 'move',
    description: 'Commands for moving members in various ways.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['MoveMembers'],
    options: getSubCommands('move'),
    execute(client, interaction: ChatInputCommandInteraction) {
        getSubCommand(interaction).execute(client, interaction);
    }
} as ChatInputCommand;
