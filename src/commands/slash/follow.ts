/**
 * @file            follow.ts
 * @author          Niiju
 * @description     Slash command file
 */

/* ------------------------------------------------------------------------- */
/*                               Node Modules                                */
/* ------------------------------------------------------------------------- */

import { ApplicationCommandOption, Client, CommandInteraction, PermissionString, VoiceChannel, VoiceState } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                  Imports                                  */
/* ------------------------------------------------------------------------- */

import { getGuildById, getMemberById } from '../../lib/util';
import { simpleEmbedMessage } from '../../lib/messageLib';
import { moveAllMembers } from '../../lib/moveLib';
import { verifyCommand } from '../../lib/commandsLib';
import { CommandInfos_t, SlashCommand_t } from '../../types';

/* ------------------------------------------------------------------------- */
/*                             Global variables                              */
/* ------------------------------------------------------------------------- */

/**
 * `15 seconds` - The maximum amount of time the bot will wait for the member to
 * change voice channel.
 */
const MAX_TIME_WAITING = 15_000;

/* ------------------------------------------------------------------------- */
/*                            Command properties                             */
/* ------------------------------------------------------------------------- */

/**
 * Command's name. (Visible on Discord)
 */
const name = 'follow';

/**
 * Command's description. (Visible on Discord)
 */
const description = 'Change channel and everyone will follow you.';

/**
 * Command's options.
 */
const options: ApplicationCommandOption[] = [];

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
    const guild = getGuildById(client, interaction.guildId);
    const member = getMemberById(guild, interaction.user.id);
    const channel1 = member.voice.channel;

    // Checking validity of the member's current channel
    if (!channel1) return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are not in a voice channel!', '#ff7675') });
    if (channel1.type === 'GUILD_STAGE_VOICE')
        return interaction.reply({ ephemeral: true, ...simpleEmbedMessage("❌ Can't do that", 'You are in a stage channel!', '#ff7675') });

    // Wait for the member to change channel with an event listener
    interaction.reply({
        ephemeral: true,
        ...simpleEmbedMessage('⌛ Waiting...', 'Waiting for you to change channel :\nYou have `15 seconds` !', '#ffeaa7')
    });
    client.on('voiceStateUpdate', detectVoiceChannelChange);

    // Start a timeout for the maximum amount of time waiting
    const timeoutMaxWait = setTimeout(() => {
        interaction.editReply(simpleEmbedMessage('❌ Out of time!', "You didn't change channel in time.", '#ff7675'));
        client.removeListener('voiceStateUpdate', detectVoiceChannelChange);
    }, MAX_TIME_WAITING);

    /**
     * Function handling the "voiceStateUpdate" event
     */
    function detectVoiceChannelChange(oldState: VoiceState, newState: VoiceState) {
        if (newState.member.id !== member.id) return; // Not the member using the command
        if (oldState.guild.id !== newState.guild.id) return; // Not the same guild
        if (oldState.channelId === newState.channelId) return; // Same channel
        if (!newState.channelId || !newState.channel) return; // Not in a channel anymore
        if (newState.channel.type !== 'GUILD_VOICE' && newState.channel.type !== 'GUILD_STAGE_VOICE') return; // Not a Voice/Stage channel

        const channel2 = newState.channel;
        const nbMembers = oldState.channel.members.size;

        // Clear the timeout
        clearTimeout(timeoutMaxWait);

        // Remove the event listener
        client.removeListener('voiceStateUpdate', detectVoiceChannelChange);

        // Move all members from channel1 to channel2
        const nbMembersMoved = moveAllMembers(channel1, channel2);

        // Done! Edit the previous reply
        let description = '';
        if (!nbMembersMoved) description = 'Nothing changed.';
        else {
            description = `**${nbMembersMoved}** member${nbMembersMoved === 1 ? ' has' : 's have'} been moved from <#${channel1.id}> to <#${
                channel2.id
            }>`;
            if (nbMembersMoved < nbMembers)
                description += '\n\nSome members may not have been moved due to them not having the `Connect` permission to the channel.';
        }
        interaction.editReply(simpleEmbedMessage('✅ Done!', description, '#55efc4'));
    }
}

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export default {
    data: { name, description, options },
    verify,
    execute
} as SlashCommand_t;
