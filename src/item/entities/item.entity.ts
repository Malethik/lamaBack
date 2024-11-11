import { Order } from '../../order/entities/order.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

export class Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  Supplier: Supplier;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
  order: Order;
  orderId: number;
}
