/**
 * @file            moveLib.ts
 * @author          Niiju
 * @description     Collection of functions for moving members for discord.js
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { GuildMember, Permissions, StageChannel, VoiceChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

/**
 * Moves a member to a voice or stage channel.
 * @note A member must have the `CONNECT` permissions or else he won't be moved.
 * @param {GuildMember} member The member to move
 * @param {VoiceChannel | StageChannel} channel The voice or stage channel
 * @return {boolean} `true` if the member was sucessfully moved, `false` if not.
 */
function move(member: GuildMember, channel: VoiceChannel | StageChannel): boolean {
    if (!member.voice.channel || !movable(member, channel)) return false;
    member.voice.setChannel(channel);
    return true;
}

/**
 * @param {GuildMember} member The member
 * @param {VoiceChannel | StageChannel} channel The channel
 * @return {boolean} `true` if the member can be moved, `false` if not.
 */
function movable(member: GuildMember, channel: VoiceChannel | StageChannel): boolean {
    return member.permissionsIn(channel).has(Permissions.FLAGS.CONNECT);
}

/**
 * Moves all members in a voice channel to another one.
 * @note Members without the `CONNECT` permissions won't be moved.
 * @param {VoiceChannel | StageChannel} channel1 Initial voice/stage channel
 * @param {VoiceChannel | StageChannel} channel2 Destination voice/stage channel
 * @return {number} The amount of members moved.
 */
function moveAllMembers(channel1: VoiceChannel | StageChannel, channel2: VoiceChannel | StageChannel): number {
    if (!channel1 || !channel2 || channel1 === channel2) return 0;

    let count = 0;
    channel1.members.forEach(member => {
        if (move(member, channel2)) count++;
    });
    return count;
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export { move, movable, moveAllMembers };
