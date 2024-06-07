import { Logger } from '@nestjs/common';
import { 
    Observable,
    map, 
    tap,
    mergeMap,
    delayWhen,
    forkJoin,
    toArray,
    catchError
} from 'rxjs';

import { CreateProductInput, ProductDomainService } from './domain-service'
import { ProductRepository } from 'src/infrastructure/repositories/product'
import { ProductSearchCriteria } from './repository'
import { ProductDto, createProductDto } from './dto'
import { RedisService } from 'src/infrastructure/cache/redis';
import { ProductSchema } from './model';
import { delay } from 'lodash';
import { SetResult } from 'src/infrastructure/cache/cache';

type ProductListResponse = {
    products: ProductDto[]
    total: number
    page: number
    recordsPerPage: number
}

export class ProductService {
    private _logger: Logger

    constructor(
        private readonly _productRepository: ProductRepository,
        private readonly _productDomainService: ProductDomainService,
        private readonly _redis: RedisService
    ) {
        this._logger = new Logger()
    }

    public createProduct(input: CreateProductInput): Observable<{ isSuccess: boolean}> {
        // TODO: check product is exists --> should throw error or update depend on business.
        return this._productDomainService.createProduct(input).pipe(
            mergeMap(product => this._productRepository.create(product)),
            tap(res => {
                if(res === false) {
                    throw new Error(`Error occur when insert data`)
                }
            }),
            map(() => ({ isSuccess: true })),
            
        )
    }

    public searchProduct(
        searchCriteria: ProductSearchCriteria,
        page?: number,
        recordsPerPage?: number
    ): Observable<ProductListResponse> {
        return this._productRepository.search(searchCriteria, page, recordsPerPage).pipe(
            map(item => {
                return {
                    products: item.products.map(product => createProductDto(product)),
                    total: item.total,
                    page: item.page,
                    recordsPerPage: item.recordsPerPage
                }
            }),
            delayWhen(({ products }) => {
                    const setTasks = products.map(productDto => {
                        const key = `product:id:${productDto.id}`
                        const ttlMilliSec = 60 * 1000 // 60 sec
                        const serializer = (obj: ProductSchema) => JSON.stringify(obj)

                        return this._redis.set<ProductSchema>(key, productDto, ttlMilliSec, serializer)
                    })

                    return forkJoin(setTasks).pipe(
                        tap((setResults: SetResult[]) => {
                            setResults.forEach(result => {
                                if(result.result) {
                                    this._logger.log(`set ${result.key} in Redis successful`)
                                } else {
                                    this._logger.warn(`can not set ${result.key} in Redis`)
                                }
                            })
                        })
                    )
            }),
            catchError(err => {
                console.log(err)
                throw new Error(err)
            })
        )
    }
}