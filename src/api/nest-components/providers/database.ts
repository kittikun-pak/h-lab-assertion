import { Provider } from "@nestjs/common"
import { ConfigService } from "src/domain/infrastructures/config"
import { PostgresDatabase } from "src/infrastructure/database/database"
import { providerName } from "./provider-name"

const { ENV_CONFIG, POSTGRES_DATABASE } = providerName

export const postgresDatabase: Provider = {
    provide: POSTGRES_DATABASE ,
    useFactory: (config: ConfigService) => {
        return new PostgresDatabase(config)
    },
    inject: [ ENV_CONFIG ]
}