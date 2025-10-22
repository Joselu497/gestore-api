import { IsString, IsOptional, IsInt } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsOptional()
  pricesIds?: number[];

  @IsInt()
  userId: number;
}
