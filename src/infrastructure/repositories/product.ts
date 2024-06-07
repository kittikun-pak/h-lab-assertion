import { 
    Observable,
    from,
    map,
    catchError,
    of,
    forkJoin,
    throwError
} from "rxjs"

import { IProductRepository, ProductSearchCriteria } from "src/domain/product/repository"
import { Product, ProductSchema } from "src/domain/product"
import { createProductNameDto, createProductDescriptionDto } from "src/domain/product"
import { IDatabase } from "pg-promise"
import { PostgresDatabase } from "../database/database"

export class ProductRepository implements IProductRepository {
    private _db: IDatabase<any>

    constructor(private readonly _postgresDatabase: PostgresDatabase) {
        this._db = this._postgresDatabase.getDatabase()
    }

    public create(product: Product): Observable<boolean> {
        const name = createProductNameDto(product.getName())
        const description = createProductDescriptionDto(product.getDescription())

        return from(this._db.none(`INSERT INTO products(name, description, created_date) VALUES($1, $2, $3)`, [name, description, new Date()])).pipe(
            map(() => true),
            catchError(() => of(false))
        )
    }

    public search(
        searchCriteria: ProductSearchCriteria,
        page: number,
        recordsPerPage: number
    ): Observable<{ products: Product[]; total: number; page: number; recordsPerPage: number }> {
        const skip = (page - 1) * recordsPerPage

        return forkJoin({
            products: this._db.manyOrNone(`
            SELECT * FROM products 
            WHERE EXISTS 
            (
              SELECT *
              FROM jsonb_each_text(name) AS kv
              WHERE kv.value LIKE $1
            )
            ORDER BY id ASC
            OFFSET $2
            LIMIT $3
            `, 
            [
                `%${searchCriteria.byMatchProductName}%`,
                skip,
                recordsPerPage
            ]),
            total: this._db.one(`
            SELECT COUNT(*) FROM products 
            WHERE EXISTS 
            (
              SELECT *
              FROM jsonb_each_text(name) AS kv
              WHERE kv.value LIKE $1
            )`,
            [
                `%${searchCriteria.byMatchProductName}%`
            ], (v: any) => +v.count),
        }).pipe(
            map(({ products, total }) => {
                return {
                    products: products.map(row => {
                        const { id ,name, description } = row

                        const obj: ProductSchema = {
                            id: id,
                            name: {
                                th: name.th,
                                en: name.en,
                                cn: name.cn,
                                jp: name.jp,
                                fr: name.fr
                            },
                            description: {
                                th: description.th,
                                en: description.en,
                                cn: description.cn,
                                jp: description.jp,
                                fr: description.fr
                            },
                            createdDate: row.created_date,
                            updatedDate: row.updated_date
                        }

                        return Product.createFromExisting(obj)
                    }),
                    total,
                    page,
                    recordsPerPage
                }
            }),
            catchError(err => {
                return throwError(() => new Error(err))
            })
        )
    }
}