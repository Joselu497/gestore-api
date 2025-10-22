import moment from 'moment';
import { Transaction } from './transaction.entity';
import { FindOptionsWhere, Between } from 'typeorm';

interface TransactionQuery {
  type?: 'sale' | 'purchase';
  startDate?: string;
  endDate?: string;
}

export function transactionsFilter(
  query: TransactionQuery,
): FindOptionsWhere<Transaction> {
  const filter: FindOptionsWhere<Transaction> = {};

  if (query.type) {
    filter.type = query.type;
  }

  if (query.startDate || query.endDate) {
    const startDate = query.startDate
      ? moment(query.startDate).startOf('day').toDate()
      : moment('2000-01-01').startOf('day').toDate();

    const endDate = query.endDate
      ? moment(query.endDate).endOf('day').toDate()
      : moment('2100-01-01').endOf('day').toDate();

    filter.date = Between(startDate, endDate);
  }

  return filter;
}
