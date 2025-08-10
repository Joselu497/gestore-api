import { IsString, IsOptional, IsInt } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsOptional()
  pricesIds?: number[];

  @IsOptional()
  purchasesIds?: number[];

  @IsOptional()
  salesIds?: number[];

  @IsInt()
  userId: number;
}
