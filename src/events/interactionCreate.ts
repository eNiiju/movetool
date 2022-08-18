import { Interaction } from 'discord.js';
import { Event } from '../types';

export default {
    name: 'interactionCreate',
    handler(client, commands, interaction: Interaction) {
        // Chat input
        if (interaction.isChatInputCommand()) {
            const command = commands.chatInput.get(interaction.commandName);
            command?.execute(client, interaction);
        }
        // Context menu
        else if (interaction.isContextMenuCommand()) {
            const command = commands.contextMenu.get(interaction.commandName);
            command?.execute(client, interaction);
        }
    }
} as Event;
