import { Price } from './price.entity';
import { FindOptionsWhere } from 'typeorm';

interface PriceQuery {
  productId?: number;
  type?: 'sale' | 'purchase';
}

export function pricesFilter(query: PriceQuery): FindOptionsWhere<Price> {
  const filter: FindOptionsWhere<Price> = {};

  if (query.productId) {
    filter.productId = query.productId;
  }
  if (query.type) {
    filter.type = query.type;
  }

  return filter;
}
