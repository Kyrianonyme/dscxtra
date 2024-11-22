import { Client } from 'discord.js'
import { PathLike } from 'fs'

export interface HandlerOptions {
    client: Client
    commandsPath?: PathLike
    eventsPath?: PathLike
    interactionsPath?: PathLike
    commandsMode?: 'normal' | 'subfolders'
    eventsMode?: 'normal' | 'subfolders' | 'foldernames'
    interactionsMode?: 'normal' | 'subfolders'
}
