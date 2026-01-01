import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_core/base/base.service';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { transactionsFilter } from './transaction.filter';

@Injectable()
export class TransactionsService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
  ) {
    super(repository);
  }

  async getTotal(query: object, type: 'sale' | 'purchase') {
    const where = transactionsFilter(query);

    const transactions = await this.repository.find({
      where,
      relations: {
        price: {
          product: {
            prices: true,
          },
        },
      },
      select: ['amount', 'price'],
    });

    const total = transactions.reduce(
      (acc, transaction) => {
        const salePrice =
          type == 'sale'
            ? transaction.price.amount
            : transaction.price.product.prices.find(
                (price) => price.type === 'sale' && price.active,
              )?.amount;

        const purchasePrice =
          type == 'purchase'
            ? transaction.price.amount
            : transaction.price.product.prices.find(
                (price) => price.type === 'purchase' && price.active,
              )?.amount;

        if (salePrice) {
          acc.totalAmount += salePrice * transaction.amount;
        }
        if (purchasePrice) {
          acc.totalIncome += purchasePrice * transaction.amount;
        }

        return acc;
      },
      {
        totalAmount: 0,
        totalIncome: 0,
      },
    );

    const totalGains = total.totalAmount - total.totalIncome;

    return {
      totalAmount: total.totalAmount,
      totalIncome: total.totalIncome,
      totalGains,
    };
  }
}
