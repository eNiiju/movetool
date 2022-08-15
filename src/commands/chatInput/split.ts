import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction } from 'discord.js';
import { ChatInputCommand } from '../../types';

export default {
    name: 'split',
    description: 'Split the members from a voice channel in half.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['MoveMembers'],
    dmPermission: false,
    options: [
        {
            name: 'destination',
            description: 'Channel to put half of the members in.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice]
        },
        {
            name: 'source',
            description: 'The channel whose members to split in half. If not provided, it will use your current voice channel.',
            required: false,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice]
        },
        {
            name: 'second_destination',
            description: 'Channel to put the other half of the members in.',
            required: false,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice]
        }
    ],
    execute(client, interaction: ChatInputCommandInteraction) {
        console.log('split');
    }
} as ChatInputCommand;
