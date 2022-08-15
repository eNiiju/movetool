import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js';
import { ChatInputCommand } from '../../types';

export default {
    name: 'logs',
    description: 'View logs.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ViewAuditLog'],
    dmPermission: true,
    execute(client, interaction: ChatInputCommandInteraction) {
        console.log('logs');
    }
} as ChatInputCommand;
