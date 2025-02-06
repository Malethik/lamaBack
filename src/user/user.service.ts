import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../core/token/token.service';
import { loginUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {}
  //metodo helper
  private async hash(value: string) {
    return hash(value, 10);
  }

  private generateRandomPassword(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  private async validateUser(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email e password sono obbligatorie');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Credenziali non valide');
    }
    return user;
  }

  //metodo di rutta

  async register(createUser: CreateUserDto) {
    const password = this.generateRandomPassword(8);
    const hashedPassword = await this.hash(password);

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: createUser.email,
      },
    });
    if (existingUser) {
      throw new ConflictException(`L'email è già in uso, scegli un'altra!`);
    }
    //Cambiare il processo con atomizzazione con transizione una volta arrivati a la versione 1.0.0
    const user = await this.create({
      ...createUser,
      password: hashedPassword,
    });
    await this.emailService.sendEmail(createUser.userName, password);

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findForAuth(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async login(data: loginUser) {
    const user = await this.validateUser(data.email, data.password);
    const token = await this.tokenService.createToken(user);
    return { token };
  }
}
