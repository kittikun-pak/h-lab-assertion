import { Module } from "@nestjs/common";

import { productDomainService } from "../providers/domain-service";

@Module({
    imports: [],
    providers: [
        productDomainService
    ],
    exports: [
        productDomainService
    ]
})
export class DomainServiceModule {}