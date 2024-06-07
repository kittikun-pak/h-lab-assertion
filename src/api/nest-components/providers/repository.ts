import { Provider } from "@nestjs/common"

import { providerName } from "./provider-name"
import { PostgresDatabase } from "src/infrastructure/database/database"
import { ProductRepository } from "src/infrastructure/repositories/product"

const { PRODUCT_REPOSITORY, POSTGRES_DATABASE } = providerName

export const productRepository: Provider = {
    provide: PRODUCT_REPOSITORY,
    useFactory: (postgresDatabase: PostgresDatabase) => {
        return new ProductRepository(postgresDatabase)
    },
    inject: [ POSTGRES_DATABASE ]
}