import { Client } from 'discord.js'
import { PathLike } from 'fs'

export interface HandlerOptions {
    client: Client
    slashCommandsPath?: PathLike
    eventsPath?: PathLike
    slashCommandsMode?: 'normal' | 'subfolders'
    eventsMode?: 'normal' | 'subfolders' | 'foldernames'
}
