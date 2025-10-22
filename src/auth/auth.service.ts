import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/_core/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { name: username },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado.');
      }

      if (!user.password) {
        throw new UnauthorizedException('Credenciales inválidas.');
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Contraseña incorrecta.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...payload } = user;

      return {
        user: payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error: any) {
      throw new UnauthorizedException(error);
    }
  }

  async validateToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
