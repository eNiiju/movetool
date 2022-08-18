import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, ChatInputCommandInteraction, VoiceBasedChannel, VoiceChannel } from 'discord.js';
import config from '../../config';
import Database from '../../modules/Database';
import { replyToInteraction } from '../../lib/message';
import { move } from '../../lib/move';
import { getMemberById } from '../../lib/util';
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
        // Retrieve options
        const destination = interaction.options.get('destination')?.channel as VoiceBasedChannel;
        const source = interaction.options.get('source')?.channel as VoiceChannel | null;
        const second_destination = interaction.options.get('second_destination')?.channel as VoiceBasedChannel | null;

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

        const members = Array.from(sourceChannel.members.values());

        // Move the top half of the members from the source channel to the destination channel
        let nbMembersMoved1 = 0;
        for (const member of members.slice(0, members.length / 2)) if (move(member, destination)) nbMembersMoved1++;

        // If there is a second destination channel, put the remaining members in it
        let nbMembersMoved2 = 0;
        if (second_destination) {
            for (const member of members.slice(members.length / 2)) if (move(member, second_destination)) nbMembersMoved2++;
        }

        // Done!
        const description =
            nbMembersMoved1 + nbMembersMoved2 === 0
                ? 'Nothing changed.'
                : `From <#${sourceChannel.id}>, **${nbMembersMoved1}** member${nbMembersMoved1 <= 1 ? ' has' : 's have'} been moved to <#${destination.id}>
                ${
                    nbMembersMoved2 > 0
                        ? `and **${nbMembersMoved2}** member${nbMembersMoved2 <= 1 ? '' : 's'} to <#${(second_destination as VoiceBasedChannel).id}>`
                        : ''
                }
                `;
        replyToInteraction(interaction, true, 'Done', description, config.colors.green);
        Database.log(guild.id, userId, '/split', nbMembersMoved1 + nbMembersMoved2);
    }
} as ChatInputCommand;
