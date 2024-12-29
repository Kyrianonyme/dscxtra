import { handlerData } from './init'
import { EventOptions } from './types'

export class Event {
    public name?: string
    public once?: boolean = false
    public run: (...args: any) => void

    constructor(options: EventOptions) {
        if (!options) {
            throw new Error('There are no event options')
        } else if (!options.run) {
            throw new Error('"run" is not defined')
        }

        if (handlerData.eventsMode !== 'foldernames' && !options.name) {
            throw new Error('"name" is not defined')
        } else if (handlerData.eventsMode === 'foldernames' && options.name) {
            throw new Error('"name" is defined but event mode is "foldernames"')
        }

        if (options.name) this.name = options.name
        if (options.once) this.once = options.once
        this.run = options.run
    }
}