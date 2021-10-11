/**
 * @file            assemble.ts
 * @author          Niiju
 * @description     Slash command file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, Collection, CommandInteraction, GuildMember, PermissionString, VoiceChannel } from 'discord.js';

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
const name = 'assemble';

/**
 * Command's description. (Visible on Discord)
 */
const description = 'Move everyone in the server to a specific channel.';

/**
 * Command's options.
 */
const options: ApplicationCommandOption[] = [
    {
        type: 'CHANNEL',
        channelTypes: ['GUILD_VOICE'],
        name: 'to',
        description: 'The destination channel. If unset, it will be your current channel.',
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
    const to = interaction.options.get('to')?.channel as VoiceChannel;

    const guild = getGuildById(client, interaction.guildId);
    const member = getMemberById(guild, interaction.user.id);
    const channel = to ?? member.voice.channel;

    // Checking the validity of the channel
    if (!channel || (channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_STAGE_VOICE'))
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are not in a voice/stage channel!', '#ff7675') });

    // Retrieve all members in the server which are connected to a voice channel
    let nbMembers = 0;
    let nbMembersMoved = 0;
    const voiceChannels = Array.from(guild.channels.cache.values()).filter(c => c.type === 'GUILD_VOICE');
    for (const voiceChannel of voiceChannels) {
        const members = Array.from((voiceChannel.members as Collection<string, GuildMember>).values());
        nbMembers += members.length;

        // Move them all to the destination channel
        for (const member of members) {
            if (member.voice.channelId !== channel.id) {
                move(member, channel);
                nbMembersMoved++;
            }
        }
    }

    // Reply to the interaction
    let description = '';
    if (!nbMembersMoved) description = 'Nothing changed.';
    else {
        description = `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved to <#${channel.id}>`;
        if (nbMembersMoved < nbMembers)
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
