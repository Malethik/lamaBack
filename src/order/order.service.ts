import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const { total, items, sended, costumersId } = createOrderDto;

    // Crea l'ordine
    const order = this.prismaService.order.create({
      data: {
        total,
        sended,
        costumersId,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity, // Quantità per ciascun articolo
            itemId: item.itemId, // ID dell'articolo
          })),
        },
      },
      include: {
        items: {
          include: {
            item: true, // Include i dettagli dell'articolo
          },
        },
      },
    });

    return order;
  }

  findAll() {
    return this.prismaService.order.findMany();
  }
  findAllFull() {
    return this.prismaService.order.findMany({
      include: {
        items: {
          select: {
            quantity: true, // Quantità specifica dell'ordine
            item: true,
          },
        },
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
      data: {
        total: updateOrderDto.total,
        sended: updateOrderDto.sended,
        costumersId: updateOrderDto.costumersId,
        items: {
          update: updateOrderDto.items?.map((item) => ({
            where: { id: item.id }, // Assicurati che l'ID dell'articolo sia incluso nel DTO
            data: { quantity: item.quantity }, // Aggiorna la quantità dell'articolo
          })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
