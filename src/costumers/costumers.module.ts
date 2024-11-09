import { Module } from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { CostumersController } from './costumers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CostumersController],
  providers: [CostumersService, PrismaService],
})
export class CostumersModule {}
