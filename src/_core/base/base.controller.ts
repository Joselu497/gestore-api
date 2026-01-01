import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { BaseService } from './base.service';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
export class BaseController<
  T extends ObjectLiteral,
  TDto extends DeepPartial<T>,
> {
  constructor(private readonly service: BaseService<T>) {}

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('pagination') pagination?: string,
    @Query('sort') sort?: string,
    @Req() req?: { where: FindOptionsWhere<T>; relations: string[] },
  ): Promise<[T[], number] | T[]> {
    const paginate = pagination !== 'false';
    const where = req?.where || {};
    const relations = req?.relations || [];

    let order: FindOptionsOrder<T> | undefined;

    if (sort) {
      const [field, direction] = sort.split(':');
      if (field && (direction === 'ASC' || direction === 'DESC')) {
        order = { [field]: direction } as unknown as FindOptionsOrder<T>;
      }
    }

    return this.service.findAll(limit, page, paginate, where, relations, order);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req?: { where: FindOptionsWhere<T>; relations: string[] },
  ): Promise<T | null> {
    const relations = req?.relations || [];

    return this.service.findOne(+id, relations);
  }

  @Post()
  create(@Body() createDto: TDto): Promise<T> {
    return this.service.create(createDto as T);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<TDto>,
  ): Promise<T> {
    return this.service.update(+id, updateDto as DeepPartial<T>);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
