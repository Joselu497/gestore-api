import { IsNumber, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from 'src/_core/enums/transaction-type.enum';

export class PriceDto {
  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsNumber()
  productId: number;
}
