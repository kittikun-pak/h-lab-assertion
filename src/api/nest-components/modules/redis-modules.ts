import { Module } from "@nestjs/common"
import { redisStore } from "cache-manager-redis-store"

import { redis } from "../providers/redis"
import { CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager"

const redisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    useFactory: async () => {
      const store = await redisStore({
        socket: {
          host: 'localhost',
          port: 6379,
        },
        password: '1234'
      });
      return {
        store: () => store,
      };
    }
}

@Module({
    imports: [ 
        CacheModule.registerAsync(redisOptions)
    ],
    providers: [
        redis
    ],
    exports: [
        redis
    ]
})
export class RedisModule {}