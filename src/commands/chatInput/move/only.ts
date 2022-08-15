import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { getSubCommand, getSubCommands } from '../../../lib/commands';
import { ChatInputSubCommandGroup } from '../../../types';

export default {
    name: 'only',
    description: 'Commands for moving members meeting specific criterias.',
    type: ApplicationCommandOptionType.SubcommandGroup,
    options: getSubCommands('move only'),
    execute(client, interaction: ChatInputCommandInteraction) {
        getSubCommand(interaction).execute(client, interaction);
    }
} as ChatInputSubCommandGroup;
