import { Controller } from '@nestjs/common';
import { BaseController } from 'src/_core/base/base.controller';
import { Price } from './price.entity';
import { PriceDto } from './price.dto';
import { PricesService } from './prices.service';

@Controller('prices')
export class PricesController extends BaseController<Price, PriceDto> {
  constructor(service: PricesService) {
    super(service);
  }
}
