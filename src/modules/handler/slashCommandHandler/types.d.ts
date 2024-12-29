import { SlashCommandBuilder } from 'discord.js'

export interface CommandOptions {
    data: SlashCommandBuilder
    run(...args: any): void
}
