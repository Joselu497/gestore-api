import { Controller } from '@nestjs/common';
import { BaseController } from 'src/_core/base/base.controller';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController<User, UserDto> {
  constructor(service: UsersService) {
    super(service);
  }
}
