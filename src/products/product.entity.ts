import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Price } from '../prices/price.entity';
import { User } from 'src/users/user.entity';
import { Base } from 'src/_core/base/base.entity';

@Entity('products')
export class Product extends Base {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;
}
