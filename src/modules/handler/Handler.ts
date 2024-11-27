import { Client } from 'discord.js'
import type { HandlerOptions } from './types'
import { initCommands } from './commandHandler/init'

export class Handler {
    private data: HandlerOptions

    constructor(options: HandlerOptions) {
        if (!options) {
            throw new Error('There are no handler options')
        }
        if (!options.client) {
            throw new Error('"client" is not defined')
        } else if (!(options.client instanceof Client)) {
            throw new Error('"client" is not a Discord Client')
        }

        if (options.commandsMode && !options.commandsPath) {
            throw new Error('"commandsMode" is not usable without "commandsPath"')
        } else if (!options.commandsMode && options.commandsPath) {
            options.commandsMode = 'normal'
        }
        if (options.eventsMode && !options.eventsPath) {
            throw new Error('"eventsMode" is not usable without "eventsPath"')
        } else if (!options.eventsMode && options.eventsPath) {
            options.eventsMode = 'normal'
        }
        if (options.interactionsMode && !options.interactionsPath) {
            throw new Error('"interactionsMode" is not usable without "interactionsPath"')
        } else if (!options.interactionsMode && options.interactionsPath) {
            options.interactionsMode = 'normal'
        }

        const modeOptions = ['normal', 'subfolders']
        const eventModeOptions = [...modeOptions, 'foldernames']

        this.validate(options.commandsMode, modeOptions)
        this.validate(options.eventsMode, eventModeOptions)
        this.validate(options.interactionsMode, modeOptions)

        this.data = options
        this.init()
    }

    private validate(mode: string | undefined, modeOptions: string[]) {
        if (mode && !modeOptions.includes(mode)) {
            throw new Error(`"${mode}" is not a valid mode`)
        }
    }

    private init() {
        this.data.client.on('ready', () => {
            initCommands(this.data)
        })
    }
}
