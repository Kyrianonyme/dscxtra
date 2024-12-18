import { Event } from './Event'
import { readdirSync } from 'fs';
import { HandlerOptions } from '../types';
import path from 'path';

export function initEvents(handler: HandlerOptions) {
    const ext = /\.(js|mjs|cjs|ts)$/i

    switch (handler.eventsMode) {
        case 'normal': {
            const eventFiles = readdirSync(handler.eventsPath!).filter(file => ext.test(file))

            for (const file of eventFiles) {
                const filePath = path.join(handler.eventsPath as string, file)
                const event: Event = require(filePath).event
                
                event.once ? handler.client.once(event.name, (...args: any) => event.run(...args)) : handler.client.on(event.name, (...args: any) => event.run(...args))
            }

            break
        }

        case 'subfolders': {
            const folders = readdirSync(handler.eventsPath!)

            for (const folder of folders) {
                const eventsPath = path.join(handler.eventsPath as string, folder)
                const eventFiles = readdirSync(eventsPath)

                for (const file of eventFiles) {
                    const filePath = path.join(eventsPath, file)
                    const event: Event = require(filePath).event

                    event.once ? handler.client.once(event.name, (...args: any) => event.run(...args)) : handler.client.on(event.name, (...args: any) => event.run(...args))
                }
            }

            break
        }
    }
}