import { Observable } from "rxjs"

import { Product } from "./model"

export type ProductSearchCriteria = {
    byMatchProductName?: string
}

export interface IProductRepository {
    create(product: Product): Observable<boolean>
    search(
        searchCriteria: ProductSearchCriteria,
        page: number,
        recordsPerPage: number
    ): Observable<{ products: Product[]; total: number; page: number; recordsPerPage: number }>
}