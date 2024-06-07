import * as sinon from 'sinon'
import {
    lastValueFrom,
    tap,
    of,
    catchError
} from 'rxjs'

import { CreateProductInput, Product, ProductDomainService } from 'src/domain/product'
import { ProductService } from 'src/domain/product/service'
import { RedisService } from 'src/infrastructure/cache/redis'
import { ProductRepository } from 'src/infrastructure/repositories/product'
import { mockProductDoc } from '../doc'
import { ProductDescription, ProductName } from 'src/domain/product/value-object'

describe('createProduct', () => {
    let mockProductModel: Product
    let productService: ProductService
    let stubProductRepository: ProductRepository
    let stubProductDomainService: ProductDomainService
    let stubRedis: RedisService

    let mockCreateProductInput: CreateProductInput = {
        name: mockProductDoc.name,
        description: mockProductDoc.description
    }

    describe('TC1. create product success', () => {
        beforeEach(() => {
            const mockProductName = new ProductName(
                mockProductDoc.name.th,
                mockProductDoc.name.en,
                mockProductDoc.name.cn,
                mockProductDoc.name.jp,
                mockProductDoc.name.fr,
            )
            const mockProductDescription = new ProductDescription(
                mockProductDoc.description.th,
                mockProductDoc.description.en,
                mockProductDoc.description.cn,
                mockProductDoc.description.jp,
                mockProductDoc.description.fr,
            )
            mockProductModel = new Product(mockProductName, mockProductDescription)

            stubProductRepository = sinon.createStubInstance(ProductRepository, {
                create: of(true)
            })
            stubProductDomainService = sinon.createStubInstance(ProductDomainService, {
                createProduct: of(mockProductModel)
            })
            stubRedis = sinon.createStubInstance(RedisService)

            productService = new ProductService(
                stubProductRepository,
                stubProductDomainService,
                stubRedis
            )
        })

        it('should create success', async() => {
            await lastValueFrom(productService.createProduct(mockCreateProductInput).pipe(
                tap(res => {
                    expect(res.isSuccess).toStrictEqual(true)
                })
            ))
        })
    })

    describe('TC2. create product fail', () => {
        beforeEach(() => {
            const mockProductName = new ProductName(
                mockProductDoc.name.th,
                mockProductDoc.name.en,
                mockProductDoc.name.cn,
                mockProductDoc.name.jp,
                mockProductDoc.name.fr,
            )
            const mockProductDescription = new ProductDescription(
                mockProductDoc.description.th,
                mockProductDoc.description.en,
                mockProductDoc.description.cn,
                mockProductDoc.description.jp,
                mockProductDoc.description.fr,
            )
            mockProductModel = new Product(mockProductName, mockProductDescription)

            stubProductRepository = sinon.createStubInstance(ProductRepository, {
                create: of(false)
            })
            stubProductDomainService = sinon.createStubInstance(ProductDomainService, {
                createProduct: of(mockProductModel)
            })
            stubRedis = sinon.createStubInstance(RedisService)

            productService = new ProductService(
                stubProductRepository,
                stubProductDomainService,
                stubRedis
            )
        })

        it('should throw error', async() => {
            await lastValueFrom(productService.createProduct(mockCreateProductInput).pipe(
                catchError(err => {
                    expect(err).toBeInstanceOf(Error)
                    expect(err.message).toBe(`Error occur when insert data`)

                    return of(null)
                })
            ))
        })
    })
})