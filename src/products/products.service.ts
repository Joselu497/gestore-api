import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/_core/base/base.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductsService extends BaseService<Product, ProductDto> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository);
  }
}
