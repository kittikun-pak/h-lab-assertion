import { ConfigService as NestConfigService } from '@nestjs/config'
import { join } from 'path'
import { readFileSync } from 'fs'
import * as merge from 'deepmerge'

export type DbConfig = {
    name: string
    user: string
    password: string
}

interface Config {
    dbConfig(): DbConfig
}

export const configuration = () => {
    const environment: string = process.env.NODE_ENV ?? 'local'
    const filePath: string = join(process.cwd(), 'config', `${environment}.json`)
    const configObj = JSON.parse(readFileSync(filePath, { encoding: 'utf8' }))

    return configObj
}


export class ConfigService implements Config {
    constructor(private readonly _configService: NestConfigService) {}

    public dbConfig(): DbConfig {
        return {
            name: this._configService.get<string>('postgres.name'),
            user: this._configService.get<string>('postgres.user'),
            password: this._configService.get<string>('postgres.password'),
        }
    }
}