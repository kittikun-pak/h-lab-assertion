import { Module } from "@nestjs/common"

import { DomainServiceModule } from "./domain-service-module"
import { RepositoryModule } from "./repository-module"
import { productService } from "../providers/service"
import { RedisModule } from "./redis-modules"


@Module({
    imports: [ 
        RepositoryModule,
        DomainServiceModule,
        RedisModule
    ],
    providers: [
        productService,
    ],
    exports: [
        productService
    ]
})
export class ServiceModule {}