import { GuildMember, VoiceBasedChannel, VoiceChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

function move(member: GuildMember, channel: VoiceBasedChannel): boolean {
    if (member.voice.channelId === channel.id) return false;
    member.voice.setChannel(channel);
    return true;
}

function moveAllMembers(channel1: VoiceChannel, channel2: VoiceBasedChannel): number {
    let count = 0;
    for (const member of channel1.members.values()) if (move(member, channel2)) count++;
    return count;
}

/* ------------------------------------------------------------------------- */
/*                                  Exports                                  */
/* ------------------------------------------------------------------------- */

export { move, moveAllMembers };
