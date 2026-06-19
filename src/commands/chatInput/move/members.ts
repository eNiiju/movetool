import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, Client, VoiceBasedChannel, VoiceChannel } from 'discord.js';
import config from '../../../config';
import { replyToInteraction } from '../../../lib/message';
import { moveAllMembers } from '../../../lib/move';
import { getMemberById } from '../../../lib/util';
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
        // Retrieve options
        const destination = interaction.options.get('destination')?.channel as VoiceBasedChannel;
        const source = interaction.options.get('source')?.channel as VoiceChannel | null;

        const guild = interaction.guild;
        const userId = interaction.member?.user.id;
        if (!guild || !userId) return replyToInteraction(interaction, true, 'Error', "Can't retrieve guild or user data", config.colors.red);

        const member = getMemberById(guild, userId);
        if (!member) return replyToInteraction(interaction, true, 'Error', "Can't retrieve member data", config.colors.red);

        const sourceChannel = source ?? member.voice.channel;

        // No source channel
        if (!sourceChannel)
            return replyToInteraction(interaction, true, 'Error', "You didn't provide a source channel and are not connected to any", config.colors.red);
    
        // Source channel is empty
        if (sourceChannel.members.size === 0)
            return replyToInteraction(interaction, true, 'Error', `The channel <#${sourceChannel.id}> is empty`, config.colors.red);

        // Move members to the destination channel
        const nbMembersMoved = moveAllMembers(sourceChannel as VoiceChannel, destination);

        // Done!
        const description =
            nbMembersMoved === 0
                ? 'Nothing changed.'
                : `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved from <#${sourceChannel.id}> to <#${destination.id}>`;
        replyToInteraction(interaction, true, 'Done', description, config.colors.green);
    }
} as ChatInputSubCommand;
