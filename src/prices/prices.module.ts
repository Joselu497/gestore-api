import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { Price } from './price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/_core/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { PriceSubscriber } from './price.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), AuthModule],
  controllers: [PricesController],
  providers: [PricesService, AuthGuard, PriceSubscriber],
})
export class PricesModule {}
