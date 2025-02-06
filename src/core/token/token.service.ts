import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from '../../user/entities/user.entity';

export type Payload = {
  id: number;
  email: string;
  userName: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hash(value: string) {
    return hash(value, 10);
  }

  async compare(value: string, hash: string) {
    return compare(value, hash);
  }

  async createToken({ id, email, userName }: Partial<User>) {
    const payload: Payload = { id, email, userName };
    const token = this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1d',
    });
    return token;
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync<Payload>(token, {
      secret: this.configService.get('JWT_SECRET'),
      maxAge: '1d',
    });
  }
}
