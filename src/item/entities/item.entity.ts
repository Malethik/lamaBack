import { Supplier } from '../../supplier/entities/supplier.entity';

export class Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplier: Supplier;
  createdAt: Date;
  updatedAt: Date;
  order: Order;
  orderId: number;
}
