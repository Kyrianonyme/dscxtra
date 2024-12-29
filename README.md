# Discord Extra

This module simplifies the coding of discord bots
## Installation

Install Discord Extra with npm :

```bash
  npm install dscxtra
```

yarn :

```bash
  yarn install dscxtra
```

pnpm :

```bash
  pnpm install dscxtra
```
## Usage/Examples

**/index.js**
```javascript
const { Client } = require('discord.js')
const { Handler } = require('dscxtra')
const path = require('path')

const token = 'discord_token'

const client = new Client({
    intents: ['Guilds']
})

client.login(token)

new Handler({
    client: client,
    slashCommandsPath: path.join(__dirname, 'commands'),
    slashCommandsMode: 'normal',
    eventsPath: path.join(__dirname, 'events'),
    eventsMode: 'foldernames'
})
```

**/commands/test.js**

```javascript
const { SlashCommandBuilder } = require('discord.js');
const { SlashCommand } = require('dscxtra');

exports.command = new SlashCommand({
    data: new SlashCommandBuilder().setName('test').setDescription('test'),
    run(command) {
        command.reply('test')
    }
})
```

**/events/messageCreate/test.js**

```javascript
const { Event } = require('dscxtra');

exports.event = new Event({
    once: true,
    run(message) {
        if (message.author.bot) return;
        message.reply('test')
    },
})
```


## API Reference

```javascript
  new Handler()
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `client` | `Client (discord.js)` | **Required**. Your discord client |
| `slashCommandsPath` | `path` | Commands path |
| `slashCommandsMode` | `string` | Commands mode (`normal` (default) or `subfolders`) |
| `eventsPath` | `path` | Events path |
| `eventsMode` | `string` | Events mode (`normal` (default) or `subfolders` or `foldernames`) |

```javascript
  new SlashCommand()
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data` | `SlashCommandBuilder (discord.js)` | **Required**. Slash command data |
| `run(command)` | `function` | **Required**. Slash command executor |

```javascript
  new Event()
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string or Events (discord.js)` | **Required if mode isn't "foldernames"**. Event name |
| `once` | `boolean` | If client.once (default: false) |
| `run(command)` | `function` | **Required**. Event executor |

## License

[MIT](https://choosealicense.com/licenses/mit/)
## Author

- [@kyrianonyme](https://www.github.com/kyrianonyme)