import { Controller, Get } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { ProductsService } from './products.service';
import { BaseController } from 'src/_core/base/base.controller';

@Controller('products')
export class ProductsController extends BaseController<Product, ProductDto> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Get('inventory')
  getInventory() {
    return this.productsService.getInventory();
  }
}
