/**
 * @file            messageLib.ts
 * @author          Niiju
 * @description     Collection of template messages for discord.js
 */

/* ------------------------------------------------------------------------- */
/*                                 Functions                                 */
/* ------------------------------------------------------------------------- */

/**
 * Returns a simple embed message.
 * @param {string} title Title of the embed
 * @param {string} description Description of the embed
 * @param {string} color Hexadecimal color of the embed (example: `#ff0000`)
 */
const simpleEmbedMessage = (title: string, description: string, color: string): object => {
    return {
        embeds: [{ title, description, color }]
    };
};

/* ------------------------------------------------------------------------- */
/*                                  Export                                   */
/* ------------------------------------------------------------------------- */

export { simpleEmbedMessage };
