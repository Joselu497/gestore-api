import { User } from './user.entity';
import { FindOptionsWhere, ILike } from 'typeorm';

interface UserQuery {
  name?: string;
}

export function usersFilter(query: UserQuery): FindOptionsWhere<User> {
  const filter: FindOptionsWhere<User> = {};

  if (typeof query.name === 'string') {
    filter.name = ILike(`%${query.name}%`);
  }

  return filter;
}
