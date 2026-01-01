import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/_core/base/base.service';

export interface InventoryResult {
  productName: string;
  inventory: number;
  totalPurchases: number;
  totalSales: number;
}

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,

    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    super(repository);
  }

  async getInventory(): Promise<InventoryResult[]> {
    const result = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('product.name', 'productName')
      .addSelect(
        `SUM(CASE WHEN transaction.type = 'purchase' THEN transaction.amount ELSE 0 END)`,
        'totalPurchases',
      )
      .addSelect(
        `SUM(CASE WHEN transaction.type = 'sale' THEN transaction.amount ELSE 0 END)`,
        'totalSales',
      )
      .addSelect(
        `SUM(CASE 
      WHEN transaction.type = 'purchase' THEN transaction.amount
      WHEN transaction.type = 'sale' THEN -transaction.amount
      ELSE 0 END)`,
        'inventory',
      )
      .leftJoin('transaction.price', 'price')
      .leftJoin('price.product', 'product')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .getRawMany<InventoryResult>();

    return result.map((res) => ({
      productName: res.productName,
      inventory: Number(res.inventory) || 0,
      totalPurchases: Number(res.totalPurchases) || 0,
      totalSales: Number(res.totalSales) || 0,
    }));
  }
}
