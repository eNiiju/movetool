import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, User } from 'discord.js';
import config from '../../config';
import Database from '../../modules/Database';
import { replyToInteraction } from '../../lib/message';
import { ChatInputCommand } from '../../types';

export default {
    name: 'logs',
    description: 'View logs.',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ViewAuditLog'],
    dmPermission: false,
    options: [
        {
            name: 'user',
            description: 'View logs of a specific user.',
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ],
    async execute(client, interaction: ChatInputCommandInteraction) {
        // Retrieve options
        const user = interaction.options.get('user')?.user as User | undefined;

        if (!interaction.guild) return;

        // Retrieve logs from the database
        const logs: any = await Database.getLogs(interaction.guild.id, user?.id);

        // There is no collection in the database for this guild
        if (!(await Database.collectionExists(interaction.guild.id)))
            return replyToInteraction(
                interaction,
                true,
                'Error',
                'Logging is disabled on this server. \nAn administrator can enable it with the `/enable logging` command.',
                config.colors.red
            );

        // Reply with the logs
        let title: string;
        const description = logs
            .map(
                (log: any) =>
                    `<t:${Math.floor(log.timestamp / 1000)}:R> - <@!${log.userId}> used \`${log.command}\` to move **${log.nbMembersMoved}** member${
                        log.nbMembersMoved > 1 ? 's' : ''
                    }`
            )
            .join('\n');

        if (logs.length === 0) title = `Last logs of ${user ? user.username : 'the server'}`;
        else if (logs.length === 1) title = `Only log of ${user ? user.username : 'the server'}`;
        else title = `Last ${logs.length} logs of ${user ? user.username : 'the server'}`;

        interaction.reply({
            ephemeral: true,
            embeds: [
                {
                    title,
                    description: logs.length > 0 ? description : 'No logs found.',
                    color: logs.length > 0 ? config.colors.green : config.colors.red,
                    author: user
                        ? {
                              name: user?.tag,
                              icon_url: user?.displayAvatarURL()
                          }
                        : undefined
                }
            ]
        });
    }
} as ChatInputCommand;
