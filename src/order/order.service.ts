import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({
      data: createOrderDto,
    });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }
  findAllFull() {
    return this.prismaService.order.findMany({
      include: {
        costumers: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prismaService.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  remove(id: number) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
