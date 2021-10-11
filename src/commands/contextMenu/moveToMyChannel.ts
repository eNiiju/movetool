/**
 * @file            moveToMyChannel.ts
 * @author          Niiju
 * @description     Context menu command file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { Client, CommandInteraction, GuildMember, PermissionString } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { verifyCommand } from '../../lib/commandsLib';
import { simpleEmbedMessage } from '../../lib/messageLib';
import { move } from '../../lib/moveLib';
import { getMemberById } from '../../lib/util';
import { CommandInfos_t, ContextMenu_t } from '../../types';

/* ------------------------------------------------------------------------- */
/*                            Command properties                             */
/* ------------------------------------------------------------------------- */

/**
 * Context menu type.
 */
const type = 'USER';

/**
 * Command's name. (Visible on Discord)
 */
const name = 'Move to my channel';

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
    const member = getMemberById(interaction.guild, interaction.user.id);
    const targetMember = interaction.options.getMember('user') as GuildMember;

    // Member wants to move himself
    if (member.id === targetMember.id) return interaction.reply({ ephemeral: true, ...simpleEmbedMessage('❌ Why ?', 'You selected yourself.', '#ff7675') });

    // Member isn't in a voice or stage channel
    if (!member.voice.channelId || (member.voice.channel.type !== 'GUILD_VOICE' && member.voice.channel.type !== 'GUILD_STAGE_VOICE'))
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are not in a voice/stage channel!', '#ff7675') });

    // Targeted member isn't in a voice channel
    if (!targetMember.voice.channelId || (targetMember.voice.channel.type !== 'GUILD_VOICE' && member.voice.channel.type !== 'GUILD_STAGE_VOICE'))
        return interaction.reply({
            ephemeral: true,
            ...simpleEmbedMessage("❌ Can't do that", 'The targeted member is not in a voice/stage channel!', '#ff7675')
        });

    // Already in the member's voice channel
    if (member.voice.channelId === targetMember.voice.channelId)
        return interaction.reply({
            ephemeral: true,
            ...simpleEmbedMessage('✅ Already here!', 'Targeted member is already in your voice channel.', '#55efc4')
        });

    // Move the targeted member
    if (move(targetMember, member.voice.channel))
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage('✅ Done!', 'Targeted member was moved to your channel.', '#55efc4') });
    else return interaction.reply({ ephemeral: true, ...simpleEmbedMessage('❌ Error', 'Sorry. An unexpected error occured.', '#ff7675') });
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default {
    data: { type, name },
    verify,
    execute
} as ContextMenu_t;
