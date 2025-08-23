import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Product, (product) => product.prices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(() => Transaction, (transaction) => transaction.price)
  transactions: Transaction[];
}
