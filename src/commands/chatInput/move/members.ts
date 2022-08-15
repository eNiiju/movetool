import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, Client } from 'discord.js';
import { ChatInputSubCommand } from '../../../types';

export default {
    name: 'members',
    description: 'Move members in a voice channel to another one.',
    type: ApplicationCommandOptionType.Subcommand,
    dmPermission: false,
    options: [
        {
            name: 'destination',
            description: 'The destination channel. If not provided, it will use your current voice channel.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice]
        },
        {
            name: 'source',
            description: 'The channel to move members from.',
            required: false,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice]
        }
    ],
    execute(client: Client, interaction: ChatInputCommandInteraction) {
        console.log('move members');
    }
} as ChatInputSubCommand;
