import { Observable } from "rxjs"


export type Serializer<T> = (obj: T) => string

export type Deserializer<T> = (strObj: string) => T

export type SetResult = {
    result: boolean
    key: string
}

export interface ICache {
    get<T>(key: string, deserializer: Deserializer<T>): Observable<T | undefined>
    set<T>(key: string, value: T, ttlMilliSec: number, serializer: Serializer<T>): Observable<SetResult>
}