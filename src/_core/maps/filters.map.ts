import { productsFilter } from 'src/products/product.filter';
import { usersFilter } from '../../users/user.filter';
import { transactionsFilter } from 'src/transactions/transaction.filter';
import { pricesFilter } from 'src/prices/price.filter';

export const filtersMap: Record<string, (query: any) => object> = {
  users: usersFilter,
  products: productsFilter,
  transactions: transactionsFilter,
  prices: pricesFilter,
};
