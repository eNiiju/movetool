/**
 * @file            split.ts
 * @author          Niiju
 * @description     Slash command file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, CommandInteraction, PermissionString, StageChannel, VoiceChannel } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { verifyCommand } from '../../lib/commandsLib';
import { simpleEmbedMessage } from '../../lib/messageLib';
import { move } from '../../lib/moveLib';
import { getGuildById, getMemberById } from '../../lib/util';
import { CommandInfos_t, SlashCommand_t } from '../../types';

/* ------------------------------------------------------------------------- */
/*                            Command properties                             */
/* ------------------------------------------------------------------------- */

/**
 * Command's name. (Visible on Discord)
 */
const name = 'split';

/**
 * Command's description. (Visible on Discord)
 */
const description = 'Move the second half of the members in alphabetical order to another channel.';

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
        description: 'The initial channel. If unset, it will be from your current channel.',
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

    const member = getMemberById(interaction.guild, interaction.user.id);
    const channel1 = from ?? member.voice.channel;
    const channel2 = to;

    // Checking validity of the member's current channel
    if (!channel1 || (channel1.type !== 'GUILD_VOICE' && channel1.type !== 'GUILD_STAGE_VOICE'))
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are not in a voice/stage channel!', '#ff7675') });

    const members = Array.from(channel1.members.values());
    const nbMembers = members.length;

    // Move the second half of  members from channel1 to channel2
    let nbMembersMoved = 0;
    let i = nbMembers - 1;
    while (nbMembersMoved < nbMembers / 2) if (move(members[i--], channel2)) nbMembersMoved++;

    // Reply to the interaction
    let description = '';
    if (!nbMembersMoved) description = 'Nothing changed.';
    else {
        description = `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved from <#${channel1.id}> to <#${channel2.id}>`;
        if (nbMembersMoved < nbMembers / 2)
            description += '\n\nSome members may not have been moved due to them not having the `Connect` permission to the channel.';
    }
    interaction.reply({ ephemeral: true, ...simpleEmbedMessage('✅ Done!', description, '#55efc4') });
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default {
    data: { name, description, options },
    verify,
    execute
} as SlashCommand_t;
