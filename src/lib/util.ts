import { Client, Guild, Channel, Role, Message, TextChannel, GuildMember, ChannelType, VoiceBasedChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

const getGuildById = (client: Client, guildId: string): Guild | undefined => client?.guilds.cache.get(guildId);

const getChannelById = (guild: Guild, channelId: string): Channel | undefined => guild?.channels.cache.get(channelId);

const fetchMessageById = (channel: TextChannel, messageId: string): Promise<Message | undefined> => channel?.messages.fetch(messageId);

const getRoleById = (guild: Guild, roleId: string): Role | undefined => guild?.roles.cache.get(roleId);

const getMemberById = (guild: Guild, userId: string): GuildMember | undefined => guild?.members.cache.get(userId);

const fetchMemberById = (guild: Guild, userId: string): Promise<GuildMember | undefined> => guild?.members.fetch(userId);

const memberHasRole = (member: GuildMember, roleId: string): boolean => member?.roles.cache.has(roleId);

const isInVoiceChannel = (guild: Guild, userId: string): boolean => getMemberById(guild, userId)?.voice.channel?.type === ChannelType.GuildVoice;

const isInStageChannel = (guild: Guild, userId: string): boolean => getMemberById(guild, userId)?.voice.channel?.type === ChannelType.GuildStageVoice;

const getMemberVoiceBasedChannel = (member: GuildMember): VoiceBasedChannel | null => member.voice.channel;

/* ------------------------------------------------------------------------- */
/*                                  Exports                                  */
/* ------------------------------------------------------------------------- */

export {
    getGuildById,
    getChannelById,
    fetchMessageById,
    getRoleById,
    getMemberById,
    fetchMemberById,
    memberHasRole,
    isInVoiceChannel,
    isInStageChannel,
    getMemberVoiceBasedChannel
};
