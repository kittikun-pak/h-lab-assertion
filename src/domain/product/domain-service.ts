import { Injectable } from "@nestjs/common";
import { 
    Observable,
    of, 
} from "rxjs";

import { Product } from "./model"
import { ProductName, ProductDescription } from './value-object'

type SupportedLanguage = {
    th: string,
    en: string,
    cn: string,
    jp: string,
    fr: string
}

export type CreateProductInput = {
    name: SupportedLanguage,
    description: SupportedLanguage
}

export class ProductDomainService {
    constructor(
        
    ) {}

    public createProduct(input: CreateProductInput): Observable<Product> {
        const { name, description } = input
        const productName = new ProductName(
            name.th,
            name.en,
            name.cn,
            name.jp,
            name.fr
        )
        const productDescription = new ProductDescription(
            description.th,
            description.en,
            description.cn,
            description.jp,
            description.fr
        )
        const product = new Product(productName, productDescription)
        

        return of(product)
    }
}