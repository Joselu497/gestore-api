import { Base } from '../_core/base/base.entity';
import { Product } from '../products/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
