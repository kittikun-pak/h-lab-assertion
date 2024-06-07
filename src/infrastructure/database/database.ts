import { IDatabase } from "pg-promise"
import { ConfigService } from "src/domain/infrastructures/config"
const pgp = require('pg-promise')()

export class PostgresDatabase {
    constructor(private readonly _config: ConfigService) {}

    public getDatabase(): IDatabase<any> {
        const { name, user, password } = this._config.dbConfig()
        const connectionOptions = {
            connectionString: `postgresql://localhost:5432/${name}?user=${user}&password=${password}`
        }
        
        return pgp(connectionOptions) 
    }
}