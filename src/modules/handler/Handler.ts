import { Client } from 'discord.js'
import type { HandlerOptions } from './types'
import { initSlashCommands } from './slashCommandHandler/init'
import { initEvents } from './eventHandler/init'

export class Handler {
    public data: HandlerOptions

    constructor(options: HandlerOptions) {
        if (!options) {
            throw new Error('There are no handler options')
        }
        if (!options.client) {
            throw new Error('"client" is not defined')
        } else if (!(options.client instanceof Client)) {
            throw new Error('"client" is not a Discord Client')
        }

        if (options.slashCommandsMode && !options.slashCommandsPath) {
            throw new Error('"slashCommandsMode" is not usable without "slashCommandsPath"')
        } else if (!options.slashCommandsMode && options.slashCommandsPath) {
            options.slashCommandsMode = 'normal'
        }
        if (options.eventsMode && !options.eventsPath) {
            throw new Error('"eventsMode" is not usable without "eventsPath"')
        } else if (!options.eventsMode && options.eventsPath) {
            options.eventsMode = 'normal'
        }

        const modeOptions = ['normal', 'subfolders']
        const eventModeOptions = [...modeOptions, 'foldernames']

        this.validate(options.slashCommandsMode, modeOptions)
        this.validate(options.eventsMode, eventModeOptions)

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
            initSlashCommands(this.data)
        })
        initEvents(this.data)
    }
}
