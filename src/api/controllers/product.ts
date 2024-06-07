import { Inject, Body, Controller, Get, Post, Query } from '@nestjs/common';

import { ProductService } from 'src/domain/product/service';
import { CreateProductValidator, GetProductRequestValidator } from '../request-validator/product'
import { CreateProductInput } from 'src/domain/product';
import { ValidationPipe } from '../nest-components/pipe/validation-pipe';
import { providerName } from '../nest-components/providers';

@Controller('product')
export class ProductController  {
  constructor(
      @Inject(providerName.PRODUCT_SERVICE) private readonly _productService: ProductService,
    ) {}
  
  @Post()
  public createProduct(
    @Body(new ValidationPipe()) body: CreateProductValidator
  ) {
    const input: CreateProductInput = {
        ...body.getSchema()
      }
  
    return this._productService.createProduct(input)
  }

  @Get()
  public searchProduct(
    @Query(new ValidationPipe()) query: GetProductRequestValidator
  ) {
    return this._productService.searchProduct(
      query.getSearchCriteria(),
      query.getPage(),
      query.getRecordPerPage()
    )
  }

}
