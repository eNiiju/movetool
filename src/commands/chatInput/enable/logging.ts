import { ApplicationCommandOptionType, ChatInputCommandInteraction, Client } from 'discord.js';
import config from '../../../config';
import { replyToInteraction } from '../../../lib/message';
import Database from '../../../modules/Database';
import { ChatInputSubCommand } from '../../../types';

export default {
    name: 'logging',
    description: 'Enable or disable Movetool logging on the server.',
    type: ApplicationCommandOptionType.Subcommand,
    options: [
        {
            name: 'enable',
            description: 'Whether to enable logging. Disabling will delete all logs.',
            required: true,
            type: ApplicationCommandOptionType.Boolean
        }
    ],
    execute(client: Client, interaction: ChatInputCommandInteraction) {
        // Retrieve options
        const enable = interaction.options.get('enable')?.value as boolean;

        if (!interaction.guild) return;

        if (enable) {
            Database.createCollection(interaction.guild.id);
            return replyToInteraction(interaction, true, 'Done', "You've **enabled** logging on this server", config.colors.green);
        } else {
            Database.deleteCollection(interaction.guild.id);
            return replyToInteraction(interaction, true, 'Done', "You've **disabled** logging on this server", config.colors.green);
        }
    }
} as ChatInputSubCommand;
