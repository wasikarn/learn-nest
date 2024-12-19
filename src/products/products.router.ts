import { Input, Mutation, Query, Router, UseMiddlewares } from 'nestjs-trpc';
import { z } from 'zod';

import { LoggerMiddleware } from '../trpc/middleware/logger.middleware';
import { Product, productSchema } from './product.schema';
import { ProductsService } from './products.service';

@Router({ alias: 'products' })
@UseMiddlewares(LoggerMiddleware)
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  @Query({
    input: z.object({ id: z.string() }),
    output: productSchema,
  })
  getProduct(@Input('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Query({
    output: z.array(productSchema),
  })
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: productSchema.partial(),
    }),
    output: productSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') productData: Partial<Product>,
  ): Product {
    return this.productsService.updateProduct(id, productData);
  }

  @Mutation({
    input: productSchema,
    output: productSchema,
  })
  createProduct(@Input() productData: Product): Product {
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
