import { Module } from "@nestjs/common"

import { postgresDatabase } from "../providers/database"
import { ConfigModule } from "./config-module"

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        postgresDatabase
    ],
    exports: [
        postgresDatabase
    ]
})
export class DatabaseModule {}