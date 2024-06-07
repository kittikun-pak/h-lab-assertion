import { 
    Observable,
    from,
    map,
    of,
    catchError
} from "rxjs"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import { Cache } from "cache-manager"

import { Serializer, Deserializer, ICache, SetResult } from "./cache"
import { isNil } from "lodash"

export class RedisService implements ICache { 
    constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

    public get<T>(key: string, deserializer: Deserializer<T>): Observable<T | undefined> {
        const raw = this._cacheManager.get<string | T>(key)
        if (isNil(raw) === false) {
            return of(undefined)
        }

        return of(deserializer(raw as string))
    }

    public set<T>(key: string, value: T, ttlMilliSec: number, serializer: Serializer<T>): Observable<SetResult> {
        const raw = serializer(value)

        return from(this._cacheManager.set(key, raw, ttlMilliSec)).pipe(
            map(() => {
                return {
                    result: true,
                    key: key
                }
            }),
            catchError(() => of({
                result: false,
                key: key
            }))
        )
    }
}