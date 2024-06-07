import { Module } from '@nestjs/common'

import { DatabaseModule } from './database-module'
import { productRepository } from '../providers/repository'


@Module({
    imports: [
        DatabaseModule
    ],
    providers: [ 
        productRepository 
    ],
    exports: [
        productRepository
    ]
})
export class RepositoryModule {}