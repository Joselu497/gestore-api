import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret-key',
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
    const { sub: id, username: name } = payload;

    const user = await this.usersRepository.findOne({ where: { id, name } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = user;

    return response;
  }
}
