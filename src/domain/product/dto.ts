import { Product, ProductSchema } from "./model"
import { ProductDescription } from "./value-object/product-description"
import { ProductName } from "./value-object/product-name"

export type ProductDto = ProductSchema

export const createProductNameDto = (productName: ProductName): ProductDto['name'] => {
    return {
        th: productName.getTh(),
        en: productName.getEn(),
        cn: productName.getCn(),
        jp: productName.getJp(),
        fr: productName.getFr()
    }
}

export const createProductDescriptionDto = (productDescription: ProductDescription): ProductDto['description'] => {
    return {
        th: productDescription.getTh(),
        en: productDescription.getEn(),
        cn: productDescription.getCn(),
        jp: productDescription.getJp(),
        fr: productDescription.getFr()
    }
}

export const createProductDto = (product: Product): ProductDto => {
    const productName = product.getName()
    const productDescription = product.getDescription()

    return {
        id: product.getId(),
        name: createProductNameDto(productName),
        description: createProductDescriptionDto(productDescription),
        createdDate: product.getCreatedDate(),
        updatedDate: product.getUpdatedDate()
    }
}