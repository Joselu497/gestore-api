import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  productsIds?: number[];
}
