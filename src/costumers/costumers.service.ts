import { Injectable } from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CostumersService {
  constructor(private prismaService: PrismaService) {}

  create(createCostumerDto: CreateCostumerDto) {
    return this.prismaService.costumers.create({
      data: {
        ...createCostumerDto,
      },
    });
  }

  findAll() {
    return this.prismaService.costumers.findMany();
  }

  findOne(id: number) {
    return this.prismaService.costumers.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCostumerDto: UpdateCostumerDto) {
    return this.prismaService.costumers.update({
      where: {
        id,
      },
      data: {
        ...updateCostumerDto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.costumers.delete({
      where: {
        id,
      },
    });
  }
}
