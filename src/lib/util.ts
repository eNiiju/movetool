/**
 * @file            util.ts
 * @author          Niiju
 * @description     Utility functions for discord.js
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { Client, Guild, Channel, Role, Message, TextChannel, Permissions, GuildMember } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

/**
 * Returns a guild from it's id.
 * @param {Client} client Bot's client
 * @param {string} guildId Guild's ID
 * @return {Guild | null} The guild
 */
const getGuildById = (client: Client, guildId: string): Guild | null => client?.guilds.cache.get(guildId);

/**
 * Returns a channel from it's id.
 * @param {Client} guild The guild
 * @param {string} channelId Channel's ID
 * @return {Channel | null} The channel
 */
const getChannelById = (guild: Guild, channelId: string): Channel | null => guild?.channels.cache.get(channelId);

/**
 * Fetches a message from it's id.
 * @param {TextChannel} channel The text channel
 * @param {string} messageId Message's ID
 * @return {Promise<Message> | null} The message
 */
const fetchMessageById = async (channel: TextChannel, messageId: string): Promise<Message | null> => channel?.messages.fetch(messageId);

/**
 * Returns a role from it's id.
 * @param {Guild} guild The guild
 * @param {string} roleId Role's ID
 * @return {Role | null} The role
 */
const getRoleById = (guild: Guild, roleId: string): Role | null => guild?.roles.cache.get(roleId);

/**
 * Returns if a user is admin from his id.
 * @param {Guild} guild The guild
 * @param {string} userId User's ID
 * @return {boolean} `true` if the user is an admin
 */
const isAdmin = (guild: Guild, userId: string): boolean => guild?.members.cache.get(userId).permissions.has(Permissions.FLAGS.ADMINISTRATOR);

/**
 * Returns a GuildMember from it's id.
 * @param {Guild} guild The guild
 * @param {string} userId User's ID
 * @return {GuildMember | null} The GuildMember
 */
const getMemberById = (guild: Guild, userId: string): GuildMember | null => guild?.members.cache.get(userId);

/**
 * Fetches a GuildMember from it's id.
 * @param {Guild} guild The guild
 * @param {string} userId User's ID
 * @return {GuildMember | null} The GuildMember
 */
const fetchMemberById = (guild: Guild, userId: string): Promise<GuildMember | null> => guild?.members.fetch(userId);

/**
 * Returns if a GuildMember has a role from the role's id.
 * @param {GuildMember} member The GuildMember
 * @param {string} roleId Role's ID
 * @return {boolean} `true` if the member has the provided role
 */
const memberHasRole = (member: GuildMember, roleId: string): boolean => member?.roles.cache.has(roleId);

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export { getGuildById, getChannelById, fetchMessageById, getRoleById, isAdmin, getMemberById, fetchMemberById, memberHasRole };
