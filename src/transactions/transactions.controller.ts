import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { BaseController } from 'src/_core/base/base.controller';

@Controller('transactions')
export class TransactionsController extends BaseController<
  Transaction,
  TransactionDto
> {
  constructor(service: TransactionsService) {
    super(service);
  }
}
