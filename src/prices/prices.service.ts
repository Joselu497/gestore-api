import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/_core/base/base.service';

@Injectable()
export class PricesService extends BaseService<Price> {
  constructor(
    @InjectRepository(Price)
    repository: Repository<Price>,
  ) {
    super(repository);
  }
}
