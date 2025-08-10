import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'src/_core/base/base.service';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService extends BaseService<User, UserDto> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }
}
