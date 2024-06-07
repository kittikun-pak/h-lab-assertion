import { Provider } from "@nestjs/common"

import { providerName } from "./provider-name"
import { ProductRepository } from "src/infrastructure/repositories/product"
import { ProductDomainService } from "src/domain/product"
import { ProductService } from "src/domain/product/service"
import { RedisService } from "src/infrastructure/cache/redis"

const { 
    PRODUCT_SERVICE, 
    PRODUCT_DOMAIN_SERVICE, 
    PRODUCT_REPOSITORY, 
    REDIS 
} = providerName

export const productService: Provider = {
    provide: PRODUCT_SERVICE,
    useFactory: (
        productRepository: ProductRepository,
        productDomainService: ProductDomainService,
        redisService: RedisService
    ) => {
        return new ProductService(productRepository, productDomainService, redisService)
    },
    inject: [
        PRODUCT_REPOSITORY,
        PRODUCT_DOMAIN_SERVICE,
        REDIS
    ]
}