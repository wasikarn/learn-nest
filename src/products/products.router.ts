import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';

import { Product, productStruct } from './product.struct';
import { ProductsService } from './products.service';

@Router({ alias: 'products' })
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  @Query({
    input: z.object({ id: z.string() }),
    output: productStruct,
  })
  getProduct(@Input('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Query({
    output: z.array(productStruct),
  })
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: productStruct.partial(),
    }),
    output: productStruct,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') product: Partial<Product>,
  ): Product {
    return this.productsService.updateProduct(id, product);
  }

  @Mutation({
    input: productStruct,
    output: productStruct,
  })
  createProduct(@Input() product: Product): Product[] {
    return this.productsService.createProduct(product);
  }

  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string): boolean {
    return this.productsService.deleteProduct(id);
  }
}
