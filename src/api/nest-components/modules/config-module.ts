import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { configuration } from 'src/domain/infrastructures/config'
import { configProvider } from '../providers/config'

const configuredModule = NestConfigModule.forRoot({
    load: [configuration],
})

@Module({
    imports: [configuredModule],
    providers: [configProvider],
    exports: [configProvider],
})
export class ConfigModule {}
