import { ApplicationCommandType, UserContextMenuCommandInteraction, VoiceBasedChannel, VoiceChannel } from 'discord.js';
import config from '../../config';
import { replyToInteraction } from '../../lib/message';
import { move } from '../../lib/move';
import { getMemberById, getMemberVoiceBasedChannel, isInStageChannel, isInVoiceChannel } from '../../lib/util';
import { ContextMenuCommand } from '../../types';

export default {
    name: 'Go to their channel',
    type: ApplicationCommandType.User,
    defaultMemberPermissions: [],
    dmPermission: false,
    execute(client, interaction: UserContextMenuCommandInteraction) {
        const guild = interaction.guild;
        const userId = interaction.member?.user.id;
        const targetUserId = interaction.targetMember?.user.id;
        if (!guild || !userId || !targetUserId) return replyToInteraction(interaction, true, 'Error', "Can't retrieve guild or user data", config.colors.red);

        const member = getMemberById(guild, userId);
        const targetMember = getMemberById(guild, targetUserId);
        if (!member || !targetMember) return replyToInteraction(interaction, true, 'Error', "Can't retrieve member data", config.colors.red);

        // Member and target member are the same
        if (userId === targetUserId) return replyToInteraction(interaction, true, 'Why?', 'You selected yourself', config.colors.red);

        // Member is not in a voice or stage channel
        if (!isInVoiceChannel(guild, userId)) return replyToInteraction(interaction, true, 'Error', 'You are not in a voice channel', config.colors.red);

        // Target member is not in a voice channel
        if (!isInVoiceChannel(guild, targetUserId) && !isInStageChannel(guild, userId))
            return replyToInteraction(interaction, true, 'Error', 'This member is not in a voice channel', config.colors.red);

        const memberVoiceChannel = getMemberVoiceBasedChannel(member) as VoiceBasedChannel;
        const targetMemberVoiceChannel = getMemberVoiceBasedChannel(targetMember) as VoiceChannel;

        // Target member is already in member's voice channel
        if (memberVoiceChannel.id === targetMemberVoiceChannel.id)
            return replyToInteraction(interaction, true, 'Error', `Your are already in <@!${targetUserId}>'s voice channel`, config.colors.red);

        // Member doesn't have the permission to connect to the channel
        if (!member.permissionsIn(targetMemberVoiceChannel).has('ViewChannel') || !member.permissionsIn(targetMemberVoiceChannel).has('Connect'))
            return replyToInteraction(
                interaction,
                true,
                'Error',
                `You don't have the permission to connect to <@!${targetUserId}>'s voice channel`,
                config.colors.red
            );

        // Move member to the target member's voice/stage channel !
        move(member, targetMemberVoiceChannel);
        replyToInteraction(interaction, true, 'Done', `You were moved to <@!${targetUserId}>'s voice channel`, config.colors.green);
    }
} as ContextMenuCommand;
