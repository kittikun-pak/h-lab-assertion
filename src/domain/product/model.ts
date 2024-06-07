import { Entity } from "../infrastructures/entity"
import { ProductName, ProductDescription } from "./value-object"

export type SupportedLanguage = {
    th: string
    en: string
    cn: string
    jp: string
    fr: string
}

export type ProductSchema = {
    id: number
    name: {
        th: string
        en: string
        cn: string
        jp: string
        fr: string
    },
    description: {
        th: string
        en: string
        cn: string
        jp: string
        fr: string
    },
    createdDate: Date,
    updatedDate: Date | null
}

export class Product extends Entity {
    private _name: ProductName
    private _description: ProductDescription

    public static createFromExisting(obj: ProductSchema): Product {
        const { id, name, description, createdDate, updatedDate } = obj
        const productName = new ProductName(
            name.th,
            name.en,
            name.cn,
            name.jp,
            name.jp
        )
        const productDescription = new ProductDescription(
            description.th,
            description.en,
            description.cn,
            description.jp,
            description.fr
        )

        const product = new Product(productName, productDescription)
        product.id = id
        product.createdDate = createdDate
        product.updatedDate = updatedDate

        return product
    }

    constructor(name: ProductName, description: ProductDescription) {
        super()
        this._name = name,
        this._description = description
    }

    public getName(): ProductName {
        return this._name
    }

    public setName(name: ProductName) {
        this._name = name
    }

    public getDescription(): ProductDescription {
        return this._description
    }

    public setDescription(description: ProductDescription) {
        this._description = description
    }
}