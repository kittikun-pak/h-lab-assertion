import { Provider } from "@nestjs/common"

import { providerName } from "./provider-name"
import { ProductDomainService } from "src/domain/product"


const { PRODUCT_DOMAIN_SERVICE } = providerName

export const productDomainService: Provider = {
    provide: PRODUCT_DOMAIN_SERVICE,
    useFactory: () => {
        return new ProductDomainService()
    },
    inject: []
}