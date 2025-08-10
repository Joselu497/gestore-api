import { Controller } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { ProductsService } from './products.service';
import { BaseController } from 'src/_core/base/base.controller';

@Controller('products')
export class ProductsController extends BaseController<Product, ProductDto> {
  constructor(service: ProductsService) {
    super(service);
  }
}
