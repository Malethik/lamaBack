import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  create(createItemDto: CreateItemDto) {
    return this.prismaService.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return this.prismaService.item.findMany();
  }

  findOne(id: number) {
    return this.prismaService.item.findUnique({
      where: { id },
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.prismaService.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  remove(id: number) {
    return this.prismaService.item.delete({
      where: { id },
    });
  }
}
