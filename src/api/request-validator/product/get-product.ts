import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from "class-validator"

import { ProductSearchCriteria } from "src/domain/product/repository"

export class GetProductRequestValidator {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public byMatchProductName: string

    @IsOptional()
    @IsString()
    public page: string


    @IsOptional()
    @IsString()
    public recordPerPage: string 

    public getPage(): number {
        const page = parseInt(this.page, 10)

        if (isNaN(page) || page <= 0) {
            return 1
        }

        return page
    }

    public getRecordPerPage(): number {
        const recordPerPage = parseInt(this.recordPerPage, 10)

        if (isNaN(recordPerPage) || recordPerPage <= 0) {
            return 10
        }

        return recordPerPage
    }

    public getSearchCriteria(): ProductSearchCriteria {
        return {
            byMatchProductName: this.byMatchProductName ?? ""
        }
    }
}