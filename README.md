# About

Movetool is a Discord bot made with discord.js allowing users to easily move multiple members through voice channels.
It has commands to move members with various methods and conditions.

You can invite the bot to your server with [**This Link**](https://discord.com/api/oauth2/authorize?client_id=827353852290007080&permissions=16777216&scope=bot%20applications.commands).

| Command                 | Type              | Options                | Required permissions | Description                                                                   |
|-------------------------|:-----------------:|:----------------------:|:--------------------:|-------------------------------------------------------------------------------|
| **/assemble**           | Chat input        | [See](#assemble)       | `Move Members`       | Move everyone in the server to a specific voice channel. **I recommend restricting this command to moderators in `Server Settings` > `Integrations`.** |
| **/follow**             | Chat input        | None                   | `Move Members`       | Change voice channel and everyone from your previous channel will follow you. |
| **/move members**       | Chat input        | [See](#move-members)   | `Move Members`       | Move members in a voice channel to another one.                               |
| **/move only role**     | Chat input        | [See](#move-only-role) | `Move Members`       | Move members that have a specific role to another voice channel.              |
| **/split**              | Chat input        | [See](#split)          | `Move Members`       | Split the members from a voice channel in half.                               |
| **Go to their channel** | User context menu | None                   | None                 | Move yourself to the selected member's voice channel, if you have permission to connect. |
| **Move to my channel**  | User context menu | None                   | `Move Members`       | Move the selected member to your current voice channel.                       |

<br />

# Command options

## /assemble

| Option          | Type    | Required | Description                                                                       |
|-----------------|:-------:|:--------:|-----------------------------------------------------------------------------------|
| **destination** | Channel | `false`  | The destination channel. If not provided, it will use your current voice channel. |                                              |

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
