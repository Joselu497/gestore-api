import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from 'src/_core/base/base.entity';
import { Price } from 'src/prices/price.entity';

@Entity('transactions')
export class Transaction extends Base {
  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: ['sale', 'purchase'], nullable: false })
  type: 'sale' | 'purchase';

  @Column({ nullable: false })
  priceId: number;

  @ManyToOne(() => Price, (price) => price.transactions)
  @JoinColumn({ name: 'priceId' })
  price: Price;
}
