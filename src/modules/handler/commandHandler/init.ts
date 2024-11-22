import { PathLike, readdirSync } from 'fs'
import type { HandlerOptions } from '../types'
import { Collection, CommandInteraction } from 'discord.js'
import { Command } from './Command'
import path from 'path'

export function initCommands(handler: HandlerOptions) {
    const commands: Collection<string, () => void> = new Collection()
    const ext = /\.(js|mjs|cjs|ts)$/i

    switch (handler.commandsMode) {
        case 'normal': {
            const commandFiles = readdirSync(handler.commandsPath as PathLike).filter(file => ext.test(file))

            for (const file of commandFiles) {
                const command: Command = module.require(file).command
                commands.set(command.data.name, command.run)
            }

            break
        }

        case 'subfolders': {
            const folders = readdirSync(handler.commandsPath as PathLike)

            for (const folder of folders) {
                const commandsPath = path.join(handler.commandsPath as string, folder)
                const commandFiles = readdirSync(commandsPath)

                for (const file of commandFiles) {
                    const command: Command = module.require(file).command
                    commands.set(command.data.name, command.run)
                }

                break
            }
        }
    }
}
