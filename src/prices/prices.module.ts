import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { Price } from './price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
