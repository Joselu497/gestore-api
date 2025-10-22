import { IsInt, IsDate, IsNumber, IsEnum } from 'class-validator';
import { TransactionType } from 'src/_core/enums/transaction-type.enum';

export class TransactionDto {
  @IsDate()
  date: Date;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsInt()
  priceId: number;
}
