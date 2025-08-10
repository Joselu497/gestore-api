import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';
import { Base } from 'src/_core/base/base.entity';
import { Transaction } from 'src/transactions/transaction.entity';

@Entity('prices')
export class Price extends Base {
  @Column({ nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: ['sale', 'purchase'], nullable: false })
  type: 'sale' | 'purchase';

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Product, (product) => product.prices, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => Transaction, (transaction) => transaction.price)
  transactions: Transaction[];
}
