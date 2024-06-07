import { Provider } from "@nestjs/common"

import { providerName } from "./provider-name"
import { Cache } from "cache-manager"
import { RedisService } from "src/infrastructure/cache/redis"
import { CACHE_MANAGER } from "@nestjs/cache-manager"

const { REDIS } = providerName

export const redis: Provider = {
    provide: REDIS,
    useFactory: (cacheManager: Cache) => {
        return new RedisService(cacheManager)
    },
    inject: [ CACHE_MANAGER ]
}