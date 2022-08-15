# About

Movetool is a Discord bot made with discord.js allowing users to easily move multiple members through voice channels. <br />
It has commands to move members with various methods and conditions.

You can invite the bot to your server with [**This Link**](https://discord.com/api/oauth2/authorize?client_id=827353852290007080&permissions=16777216&scope=bot%20applications.commands).

| Command                | Type              | Options                             | Required permissions | Description                                                                   |
|------------------------|:-----------------:|:-----------------------------------:|:--------------------:|-------------------------------------------------------------------------------|
| **/assemble**          | Slash             | <a href="#assemble">See</a>         | `Move Members`       | Move everyone in the server to a specific channel.                            |
| **/follow**            | Slash             | None                                | `Move Members`       | Change voice channel and everyone from your previous channel will follow you. |
| **/logs**              | Slash             | None                                | `View Audit Log`     | View logs.                                                                    |
| **/move members**      | Slash             | <a href="#move-members">See</a>     | `Move Members`       | Move members in a voice channel to another one.                               |
| **/move only admins**  | Slash             | <a href="#move-only-admins">See</a> | `Move Members`       | Move members that are administrators of the server.                           |
| **/move only role**    | Slash             | <a href="#move-only-role">See</a>   | `Move Members`       | Move members that have a specific role.                                       |
| **/split**             | Slash             | <a href="#split">See</a>            | `Move Members`       | Split the members from a voice channel in half.                               |
| **Move to my channel** | User context menu | None                                | `Move Members`       | Split the members from a voice channel in half.                               |

<br />

# Command options

## /assemble

| Option          | Required | Description                                                                       |
|-----------------|:--------:|-----------------------------------------------------------------------------------|
| **destination** | `false`  | The destination channel. If not provided, it will use your current voice channel. |

## /move members

| Option          | Required | Description                                                                       |
|-----------------|:--------:|-----------------------------------------------------------------------------------|
| **destination** | `true`   | The destination channel. If not provided, it will use your current voice channel. |
| **source**      | `false`  | The channel to move members from.                                                 |

## /move only admins

| Option          | Required | Description                                                                       |
|-----------------|:--------:|-----------------------------------------------------------------------------------|
| **destination** | `true`   | The destination channel. If not provided, it will use your current voice channel. |
| **source**      | `false`  | The channel to move members from.                                                 |

## /move only role

| Option          | Required | Description                                                                       |
|-----------------|:--------:|-----------------------------------------------------------------------------------|
| **role**        | `true`   | The role members should have to be moved.                                         |
| **destination** | `true`   | The destination channel. If not provided, it will use your current voice channel. |
| **source**      | `false`  | The channel to move members from.                                                 |

## /split

| Option                 | Required | Description                                                                                          |
|------------------------|:--------:|------------------------------------------------------------------------------------------------------|
| **destination**        | `true`   | Channel to put half of the members in.                                                               |
| **source**             | `false`  | The channel whose members to split in half. If not provided, it will use your current voice channel. |
| **second_destination** | `false`  | Channel to put the other half of the members in.                                                     |

<br />

# Contact

You've found a bug, have feedback or want to see new features added? <br />
Contact me on Discord : **Niiju#0001**
