import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';

import { Product } from './product.struct';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  createProduct(product: Product): Product[] {
    this.products.push(product);

    return this.products;
  }

  getProductById(id: string): Product {
    const product: Product | undefined = this.products.find(
      (product: Product): boolean => product.id === id,
    );

    if (!product) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }

    return product;
  }

  getProducts(): Product[] {
    return this.products;
  }

  updateProduct(id: string, product: Partial<Product>): Product {
    const productIndex: number = this.products.findIndex(
      (product: Product): boolean => product.id === id,
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
    } as Product;

    return this.products[productIndex];
  }

  deleteProduct(id: string): boolean {
    const productIndex: number = this.products.findIndex(
      (product: Product): boolean => product.id === id,
    );

    if (productIndex === -1) {
      return false;
    }

    this.products.splice(productIndex, 1);

    return true;
  }
}
