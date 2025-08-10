import { IsBoolean, IsInt, IsDate, IsNumber, IsEnum } from 'class-validator';
import { TransactionType } from 'src/_core/enums/transaction-type.enum';

export class TransactionDto {
  @IsDate()
  date: Date;

  @IsNumber()
  amount: number;

  @IsBoolean()
  isAdmin: boolean;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsInt()
  priceId: number;
}
