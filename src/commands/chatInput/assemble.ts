import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction } from 'discord.js';
import { ChatInputCommand } from '../../types';

export default {
    name: 'assemble',
    description: 'Move everyone in the server to a specific channel.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['MoveMembers'],
    dmPermission: false,
    options: [
        {
            name: 'destination',
            description: 'The destination channel. If not provided, it will use your current voice channel.',
            required: false,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice]
        }
    ],
    execute(client, interaction: ChatInputCommandInteraction) {
        console.log('assemble');
    }
} as ChatInputCommand;
