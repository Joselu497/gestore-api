import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
export class BaseController<
  T extends ObjectLiteral,
  TDto extends DeepPartial<T>,
> {
  constructor(private readonly service: BaseService<T>) {}

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<T | null> {
    return this.service.findOne(+id);
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
