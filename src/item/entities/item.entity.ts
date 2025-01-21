import { Order } from '../../order/entities/order.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

export class Item {
  id: number;
  name: string;
  description: string;
  price: number;
  cost: number;
  currency: string;
  category?: string;
  tags?: string;
  quantity: number;
  lot: string;
  createdAt: Date;
  updatedAt: Date;
  supplier: Supplier;
  supplierId: number;
  order?: Order;
  orderId?: number;
}
