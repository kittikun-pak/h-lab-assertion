import { Provider } from "@nestjs/common"
import { providerName } from "./provider-name"
import { ConfigService as NestConfigService} from "@nestjs/config"
import { ConfigService } from "src/domain/infrastructures/config"

const { ENV_CONFIG } = providerName

export const configProvider: Provider = {
    provide: ENV_CONFIG,
    useFactory: (configService: NestConfigService) => {
        return new ConfigService(configService)
    },
    inject: [ NestConfigService ]
}