import { ProductSchema } from "src/domain/product"

export const mockProductDoc: ProductSchema = {
    id: 1,
    name: {
        th: 'mock name th',
        en: 'mock name en',
        cn: 'mock name cn',
        jp: 'mock name cp',
        fr: 'mock name fr'
    },
    description: {
        th: 'mock description th',
        en: 'mock description en',
        cn: 'mock description cn',
        jp: 'mock description jp',
        fr: 'mock description fr'
    },
    createdDate: new Date(),
    updatedDate: new Date()
}