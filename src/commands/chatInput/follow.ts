import { ApplicationCommandType, ChatInputCommandInteraction, VoiceBasedChannel, VoiceChannel, VoiceState } from 'discord.js';
import config from '../../config';
import { embedMessage, replyToInteraction } from '../../lib/message';
import { getMemberById, getMemberVoiceBasedChannel, isInVoiceChannel } from '../../lib/util';
import { ChatInputCommand } from '../../types';
import { moveAllMembers } from '../../lib/move';

const MAX_WAITING_TIME = 15_000;

export default {
    name: 'follow',
    description: 'Change voice channel and everyone from your previous channel will follow you.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['MoveMembers'],
    dmPermission: false,
    execute(client, interaction: ChatInputCommandInteraction) {
        const guild = interaction.guild;
        const userId = interaction.member?.user.id;
        if (!guild || !userId) return replyToInteraction(interaction, true, 'Error', "Can't retrieve guild or user data", config.colors.red);

        const member = getMemberById(guild, userId);
        if (!member) return replyToInteraction(interaction, true, 'Error', "Can't retrieve member data", config.colors.red);

        // Member is not in a voice channel
        if (!isInVoiceChannel(guild, userId)) return replyToInteraction(interaction, true, 'Error', 'You are not in a voice channel', config.colors.red);

        const memberVoiceChannel = getMemberVoiceBasedChannel(member) as VoiceChannel;

        // Member is alone in his voice channel
        if (memberVoiceChannel.members.size === 1)
            return replyToInteraction(interaction, true, 'Error', 'You are alone in your voice channel', config.colors.red);

        // Wait for the member to change channel with an event listener
        replyToInteraction(interaction, true, 'Waiting', 'You have 15 seconds to change channel !', config.colors.yellow);
        client.on('voiceStateUpdate', handleVoiceStateUpdate);

        // Start a timeout
        const timeout = setTimeout(() => {
            client.removeListener('voiceStateUpdate', handleVoiceStateUpdate);
            interaction.editReply(embedMessage('Out of time', "You didn't change channel in time.", config.colors.red));
        }, MAX_WAITING_TIME);

        function handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
            if (newState.member?.id !== member?.id) return; // Not the member using the command
            if (oldState.guild.id !== newState.guild.id) return; // Not the same guild
            if (oldState.channelId === newState.channelId) return; // Same channel
            if (!newState.channelId || !newState.channel) return; // Not in a channel
            if (!newState.channel.isVoiceBased()) return; // Not a voice based channel

            const destinationChannel = newState.channel as VoiceBasedChannel;

            clearTimeout(timeout);
            client.removeListener('voiceStateUpdate', handleVoiceStateUpdate);

            const nbMembersMoved = moveAllMembers(memberVoiceChannel, destinationChannel);

            // Done! Edit the previous reply
            const description =
                nbMembersMoved === 0
                    ? 'Nothing changed.'
                    : `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved from <#${memberVoiceChannel.id}> to <#${destinationChannel.id}>`;
            interaction.editReply(embedMessage('Done', description, config.colors.green));
        }
    }
} as ChatInputCommand;
