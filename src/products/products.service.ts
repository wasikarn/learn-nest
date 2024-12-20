import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';

import { ProductDto } from './product.dto.schema';

@Injectable()
export class ProductsService {
  private products: ProductDto[] = [];

  createProduct(productData: ProductDto): ProductDto {
    this.products.push(productData);

    return productData;
  }

  getProductById(id: string): ProductDto {
    const product: ProductDto | undefined = this.products.find(
      (product: ProductDto): boolean => product.id === id,
    );

    if (!product) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    return product;
  }

  getProducts(): ProductDto[] {
    return this.products;
  }

  updateProduct(id: string, product: Partial<ProductDto>): ProductDto {
    const productIndex: number = this.products.findIndex(
      (product: ProductDto): boolean => product.id === id,
    );

    if (productIndex === -1) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...product,
    } as ProductDto;

    return this.products[productIndex];
  }

  deleteProduct(id: string): boolean {
    const productIndex: number = this.products.findIndex(
      (product: ProductDto): boolean => product.id === id,
    );

    if (productIndex === -1) {
      return false;
    }

    this.products.splice(productIndex, 1);

    return true;
  }
}
