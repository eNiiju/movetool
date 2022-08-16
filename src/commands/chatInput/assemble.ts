import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction, VoiceBasedChannel, VoiceChannel } from 'discord.js';
import config from '../../config';
import { replyToInteraction } from '../../lib/message';
import { moveAllMembers } from '../../lib/move';
import { getMemberById, isInStageChannel, isInVoiceChannel } from '../../lib/util';
import { ChatInputCommand } from '../../types';

export default {
    name: 'assemble',
    description: 'Move everyone in the server to a specific voice channel.',
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
        // Retrieve options
        const destination = interaction.options.get('destination')?.channel as VoiceBasedChannel | null;

        const guild = interaction.guild;
        const userId = interaction.member?.user.id;
        if (!guild || !userId) return replyToInteraction(interaction, true, 'Error', "Can't retrieve guild or user data", config.colors.red);

        const member = getMemberById(guild, userId);
        if (!member) return replyToInteraction(interaction, true, 'Error', "Can't retrieve member data", config.colors.red);

        const channel = destination ?? member.voice.channel;

        // No channel
        if (!channel) return replyToInteraction(interaction, true, 'Error', "You didn't provide a channel and are not connected to any", config.colors.red);

        // Move members from every voice channel in the server to the desired channel
        let nbMembersMoved = 0;
        const serverVoiceChannels = Array.from(guild.channels.cache.values()).filter(c => c.type === ChannelType.GuildVoice);
        for (const c of serverVoiceChannels) nbMembersMoved += moveAllMembers(c as VoiceChannel, channel);

        // Nobody was found in a voice channel in the server
        if (nbMembersMoved === 0) return replyToInteraction(interaction, true, 'Error', 'Nobody was found in a voice channel.', config.colors.red);

        // Done!
        replyToInteraction(
            interaction,
            true,
            'Done',
            `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved to <#${channel.id}>`,
            config.colors.green
        );
    }
} as ChatInputCommand;
