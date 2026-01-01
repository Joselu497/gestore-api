import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { BaseController } from 'src/_core/base/base.controller';

@Controller('transactions')
export class TransactionsController extends BaseController<
  Transaction,
  TransactionDto
> {
  constructor(private readonly transactionsService: TransactionsService) {
    super(transactionsService);
  }

  @Get('total')
  getTotal(
    @Query('type') type: 'sale' | 'purchase',
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('productId') productId: number,
  ) {
    const query = {
      type,
      startDate,
      endDate,
      productId,
    };

    return this.transactionsService.getTotal(query, type);
  }
}
