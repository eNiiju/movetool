import { GuildMember, VoiceBasedChannel, VoiceChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

function movable(member: GuildMember, channel: VoiceBasedChannel): boolean {
    return member.permissionsIn(channel).has('Connect');
}

function move(member: GuildMember, channel: VoiceBasedChannel) {
    member.voice.setChannel(channel);
}

function moveAllMembers(channel1: VoiceChannel, channel2: VoiceBasedChannel): number {
    let count = 0;
    for (const member of channel1.members.values()) {
        if (movable(member, channel2)) {
            move(member, channel2);
            count++;
        }
    }
    return count;
}

/* ------------------------------------------------------------------------- */
/*                                  Exports                                  */
/* ------------------------------------------------------------------------- */

export { movable, move, moveAllMembers };
