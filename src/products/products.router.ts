import { Input, Mutation, Query, Router, UseMiddlewares } from 'nestjs-trpc';
import { z } from 'zod';

import { LoggerMiddleware } from '../trpc/middleware/logger.middleware';
import { ProductDto, productDtoSchema } from './product.dto.schema';
import { ProductsService } from './products.service';

@Router({ alias: 'products' })
@UseMiddlewares(LoggerMiddleware)
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  @Query({
    input: z.object({ id: z.string() }),
    output: productDtoSchema,
  })
  getProduct(@Input('id') id: string): ProductDto {
    return this.productsService.getProductById(id);
  }

  @Query({
    output: z.array(productDtoSchema),
  })
  getProducts(): ProductDto[] {
    return this.productsService.getProducts();
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: productDtoSchema.partial(),
    }),
    output: productDtoSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') productData: Partial<ProductDto>,
  ): ProductDto {
    return this.productsService.updateProduct(id, productData);
  }

  @Mutation({
    input: productDtoSchema,
    output: productDtoSchema,
  })
  createProduct(@Input() productData: ProductDto): ProductDto {
    return this.productsService.createProduct(productData);
  }

  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string): boolean {
    return this.productsService.deleteProduct(id);
  }
}
