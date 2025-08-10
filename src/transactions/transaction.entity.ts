import { Entity, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Price, (price) => price.transactions)
  price: Price;
}
