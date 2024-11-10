import { Supplier } from '../../supplier/entities/supplier.entity';

export class CreateItemDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  Supplier: Supplier;
  order: Order;
}
