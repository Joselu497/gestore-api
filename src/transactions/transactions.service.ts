import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_core/base/base.service';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto } from './transaction.dto';

@Injectable()
export class TransactionsService extends BaseService<
  Transaction,
  TransactionDto
> {
  constructor(
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
  ) {
    super(repository);
  }
}
