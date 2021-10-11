/**
 * @file            config.ts
 * @author          Niiju
 * @description     Configuration file
 */


import { Intents } from 'discord.js';

const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES];
const partials = [];
const debugGuildId = '714979539251626137';

export { intents, partials, debugGuildId };
