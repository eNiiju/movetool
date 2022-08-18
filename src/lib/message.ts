import { CommandInteraction } from 'discord.js';

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

/**
 * Returns a simple embed message.
 * @param title Title of the embed
 * @param description Description of the embed
 * @param color Hexadecimal color of the embed (example: 0xff0000)
 */
function embedMessage(title: string, description: string, color: number): object {
    return {
        embeds: [{ title, description, color }]
    };
}

function replyToInteraction(interaction: CommandInteraction, ephemeral: boolean, title: string, description: string, color: number) {
    interaction.reply({
        ephemeral,
        ...embedMessage(title, description, color)
    });
}

/* ------------------------------------------------------------------------- */
/*                                  Exports                                  */
/* ------------------------------------------------------------------------- */

export { embedMessage, replyToInteraction };
