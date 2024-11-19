import { Client } from 'discord.js'

export interface HandlerOptions {
    client: Client
    commandsPath?: string
    eventsPath?: string
    interactionsPath?: string
    commandsMode?: 'normal' | 'subfolders'
    eventsMode?: 'normal' | 'subfolders' | 'foldernames'
    interactionsMode?: 'normal' | 'subfolders'
}
