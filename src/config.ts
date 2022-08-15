import { ClientOptions } from 'discord.js';

export default {
    clientOptions: {
        intents: ['Guilds', 'GuildMembers', 'GuildVoiceStates']
    } as ClientOptions,
    debug: {
        guildId: '714979539251626137'
    },
    colors: {
        red: 0xff7675,
        green: 0x55efc4,
        yellow: 0xffeaa7
    }
};
