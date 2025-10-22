import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_core/base/base.service';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
  ) {
    super(repository);
  }

  async getTotal(type: 'sale' | 'purchase') {
    const transactions = await this.repository.find({
      where: { type },
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
        const salePrice = transaction.price.product.prices.find(
          (price) => price.type === 'sale' && price.active,
        );
        const purchasePrice = transaction.price.product.prices.find(
          (price) => price.type === 'purchase' && price.active,
        );

        if (salePrice) {
          acc.totalAmount += salePrice.amount * transaction.amount;
        }
        if (purchasePrice) {
          acc.totalIncome += purchasePrice.amount * transaction.amount;
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
