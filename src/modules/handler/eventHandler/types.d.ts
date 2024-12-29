import { Events, ClientEvents } from 'discord.js'

export interface EventOptions {
    name?: Events | keyof ClientEvents
    once?: boolean
    run(...args: any): void
}