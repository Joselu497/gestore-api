import { Product } from './product.entity';
import { FindOptionsWhere, ILike } from 'typeorm';

interface ProductQuery {
  name?: string;
}

export function productsFilter(query: ProductQuery): FindOptionsWhere<Product> {
  const filter: FindOptionsWhere<Product> = {};

  if (typeof query.name === 'string') {
    filter.name = ILike(`%${query.name}%`);
  }

  return filter;
}
