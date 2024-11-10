import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prismaService: PrismaService) {}

  create(createSupplierDto: CreateSupplierDto) {
    return this.prismaService.supplier.create({
      data: createSupplierDto,
    });
  }

  findAll() {
    return this.prismaService.supplier.findMany();
  }

  findOne(id: number) {
    return this.prismaService.supplier.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prismaService.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  remove(id: number) {
    return this.prismaService.supplier.delete({
      where: { id },
    });
  }
}
