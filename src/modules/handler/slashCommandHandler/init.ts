import { readdirSync } from 'fs'
import type { HandlerOptions } from '../types'
import { ChatInputCommandInteraction, Collection, ContextMenuCommandInteraction, REST, Routes } from 'discord.js'
import { SlashCommand } from './SlashCommand'
import path from 'path'

export function initSlashCommands(handler: HandlerOptions) {
    const commands: Collection<string, SlashCommand> = new Collection()
    const commandsBody: object[] = []
    const ext = /\.(js|mjs|cjs|ts)$/i

    switch (handler.slashCommandsMode) {
        case 'normal': {
            const commandFiles = readdirSync(handler.slashCommandsPath!).filter(file => ext.test(file))

            for (const file of commandFiles) {
                const filePath = path.join(handler.slashCommandsPath as string, file)
                const command: SlashCommand = require(filePath).command
                commands.set(command.data.name, command)
                commandsBody.push(command.data.toJSON())
            }

            break
        }

        case 'subfolders': {
            const folders = readdirSync(handler.slashCommandsPath!)

            for (const folder of folders) {
                const slashCommandsPath = path.join(handler.slashCommandsPath as string, folder)
                const commandFiles = readdirSync(slashCommandsPath)

                for (const file of commandFiles) {
                    const filePath = path.join(slashCommandsPath, file)
                    const command: SlashCommand = require(filePath).command
                    commands.set(command.data.name, command)
                    commandsBody.push(command.data.toJSON())
                }
            }

            break
        }
    }

    const rest = new REST().setToken(handler.client.token!);

    (async () => {
        try {
            console.log(`Started refreshing ${commandsBody.length} application commands.`)

            const data = await rest.put(
                Routes.applicationCommands(handler.client.application!.id),
                { body: commandsBody }
            )

            console.log(`Successfully reloaded ${(data as object[]).length} application (/) commands.`);
        } catch (error) {
            console.error(error)
        }
    })()

    handler.client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand || !interaction.isContextMenuCommand) return
        interaction = interaction as ChatInputCommandInteraction || ContextMenuCommandInteraction
        if (commands.has(interaction.commandName)) {
            try {
                commands.get(interaction.commandName)?.run(interaction)
            } catch (error) {
                console.error(error)
            }
        }
    })
}
