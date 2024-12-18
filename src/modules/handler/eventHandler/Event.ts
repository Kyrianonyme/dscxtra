import { EventOptions } from './types'

export class Event {
    public name: string
    public once?: boolean = false
    public run: (...args: any) => void

    constructor(options: EventOptions) {
        if (!options) {
            throw new Error('There are no event options')
        } else if (!options.name || !options.run) {
            throw new Error('"name" or "run" is not defined')
        }

        this.name = options.name
        if (options.once) this.once = options.once
        this.run = options.run
    }
}