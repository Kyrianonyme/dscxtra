import { SlashCommandBuilder } from 'discord.js'
import type { CommandOptions } from './types'

export class Command {
    public data: SlashCommandBuilder
    public run: () => void

    constructor(options: CommandOptions) {
        if (!options) {
            throw new Error('There are no command options')
        } else if (!options.data || !options.run) {
            throw new Error('"data" or "run" is not defined')
        }

        this.data = options.data
        this.run = options.run
    }
}
