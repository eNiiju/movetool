# About

Movetool is a Discord bot made with discord.js allowing users to easily move multiple members through voice channels.
It has commands to move members with various methods and conditions.

The bot keeps logs of every moving actions that it took in each server, only if you've enabled logging with the **/enable logging** command.
These logs can be viewed through the **/logs** command, and can be deleted with `/enable logging false` or by removing the bot from your server.

You can invite the bot to your server with [**This Link**](https://discord.com/api/oauth2/authorize?client_id=827353852290007080&permissions=16777216&scope=bot%20applications.commands).

| Command                | Type              | Options                | Required permissions | Description                                                                   |
|------------------------|:-----------------:|:----------------------:|:--------------------:|-------------------------------------------------------------------------------|
| **/assemble**          | Chat input        | [See](#assemble)       | `Move Members`       | Move everyone in the server to a specific voice channel. **I recommend restricting this command to moderators in `Server Settings` > `Integrations`.** |
| **/enable logging**    | Chat input        | [See](#enable-logging) | `Administrator`      | Enable or disabled Movetool logging on the server.                            |
| **/follow**            | Chat input        | None                   | `Move Members`       | Change voice channel and everyone from your previous channel will follow you. |
| **/logs**              | Chat input        | [See](#logs)           | `View Audit Log`     | View logs.                                                                    |
| **/move members**      | Chat input        | [See](#move-members)   | `Move Members`       | Move members in a voice channel to another one.                               |
| **/move only role**    | Chat input        | [See](#move-only-role) | `Move Members`       | Move members that have a specific role to another voice channel.              |
| **/split**             | Chat input        | [See](#split)          | `Move Members`       | Split the members from a voice channel in half.                               |
| **Move to my channel** | User context menu | None                   | `Move Members`       | Move the selected member to your current voice channel.                       |

<br />

# Command options

## /assemble

| Option          | Type    | Required | Description                                                                       |
|-----------------|:-------:|:--------:|-----------------------------------------------------------------------------------|
| **destination** | Channel | `false`  | The destination channel. If not provided, it will use your current voice channel. |

## /enable logging

| Option     | Type    | Required | Description                                                |
|------------|:-------:|:--------:|------------------------------------------------------------|
| **enable** | Boolean | `true`   | Whether to enable logging. Disabling will delete all logs. |

## /logs

| Option          | Type | Required | Description                                                                       |
|-----------------|:----:|:--------:|-----------------------------------------------------------------------------------|
| **user**        | User | `false`  | View logs of a specific user.                                                     |

## /move members

| Option          | Type    | Required | Description                                                                       |
|-----------------|:-------:|:--------:|-----------------------------------------------------------------------------------|
| **destination** | Channel | `true`   | The destination channel. If not provided, it will use your current voice channel. |
| **source**      | Channel | `false`  | The channel to move members from.                                                 |

## /move only role

| Option          | Type    | Required | Description                                                                       |
|-----------------|:-------:|:--------:|-----------------------------------------------------------------------------------|
| **role**        | Role    | `true`   | The role members should have to be moved.                                         |
| **destination** | Channel | `true`   | The destination channel. If not provided, it will use your current voice channel. |
| **source**      | Channel | `false`  | The channel to move members from.                                                 |

## /split

| Option                 | Type    | Required | Description                                                                                          |
|------------------------|:-------:|:--------:|------------------------------------------------------------------------------------------------------|
| **destination**        | Channel | `true`   | Channel to put half of the members in.                                                               |
| **source**             | Channel | `false`  | The channel whose members to split in half. If not provided, it will use your current voice channel. |
| **second_destination** | Channel | `false`  | Channel to put the other half of the members in.                                                     |

<br />

# Contact

You've found a bug, have feedback or want to see new features added? <br />
Contact me on Discord : **Niiju#0001**
