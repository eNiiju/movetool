/**
 * @file            move only admins.ts
 * @author          Niiju
 * @description     Subcommand file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, CommandInteraction, PermissionString, StageChannel, VoiceChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { getGuildById, getMemberById } from '../../lib/util';
import { verifyCommand } from '../../lib/commandsLib';
import { CommandInfos_t, Subcommand_t } from '../../types';
import { simpleEmbedMessage } from '../../lib/messageLib';
import { move } from '../../lib/moveLib';

/* ------------------------------------------------------------------------- */
/*                            Command properties                             */
/* ------------------------------------------------------------------------- */

/**
 * Command's name. (Visible on Discord)
 */
const name = 'admins';

/**
 * Command's description. (Visible on Discord)
 */
const description = 'Only move members that are admins on the server.';

/**
 * Command's options.
 */
const options: ApplicationCommandOption[] = [
    {
        type: 'CHANNEL',
        channelTypes: ['GUILD_VOICE', 'GUILD_STAGE_VOICE'],
        name: 'to',
        description: 'The destination channel.',
        required: true
    },
    {
        type: 'CHANNEL',
        channelTypes: ['GUILD_VOICE', 'GUILD_STAGE_VOICE'],
        name: 'from',
        description: 'The initial channel. If not set, it will be from your current voice channel.',
        required: false
    }
];

/**
 * Informations about the command.
 */
const infos: CommandInfos_t = {
    dmAllowed: false,
    clientPermissions: ['MOVE_MEMBERS'] as PermissionString[]
};

/**
 * Verifies if the command can be executed.
 * Side effect : will reply to the interaction with an error message
 * if the verification fails.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The command interaction
 * @return {boolean} `true` If everything is OK, `false` if not
 */
function verify(client: Client, interaction: CommandInteraction): boolean {
    return verifyCommand(client, interaction, infos);
}

/**
 * Function to execute when the command is used.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The command interaction
 */
async function execute(client: Client, interaction: CommandInteraction) {
    // Retrieve options
    const to = interaction.options.get('to').channel as VoiceChannel | StageChannel;
    const from = interaction.options.get('from')?.channel as VoiceChannel | StageChannel;

    const guild = getGuildById(client, interaction.guildId);
    const member = getMemberById(guild, interaction.user.id);
    const channel1 = from ?? member.voice.channel;
    const channel2 = to;

    // Checking validity of the member's current channel
    if (!channel1 || (channel1.type !== 'GUILD_VOICE' && channel1.type !== 'GUILD_STAGE_VOICE'))
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are not in a voice/stage channel!', '#ff7675') });

    // Filter members
    const members = Array.from(channel1.members.values()).filter(m => m.permissions.has('ADMINISTRATOR'));
    const nbMembers = members.length;

    // Move all members from channel1 to channel2
    let nbMembersMoved = 0;
    for (const member of members) if (move(member, channel2)) nbMembersMoved++;

    // Reply to the interaction
    let description = '';
    if (!nbMembersMoved) description = 'Nothing changed.';
    else {
        description = `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved  from <#${channel1.id}> to <#${
            channel2.id
        }>`;
        if (nbMembersMoved < nbMembers)
            description += '\n\nSome members may not have been moved due to them not having the `Connect` permission to the channel.';
    }
    interaction.reply({ ephemeral: true, ...simpleEmbedMessage('✅ Done!', description, '#55efc4') });
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default {
    data: { type: 'SUB_COMMAND', name, description, options },
    verify,
    execute
} as Subcommand_t;
