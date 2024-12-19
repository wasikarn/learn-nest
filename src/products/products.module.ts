import { Module } from '@nestjs/common';

import { ProductsRouter } from './products.router';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, ProductsRouter],
})
export class ProductsModule {}
