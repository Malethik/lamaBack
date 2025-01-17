import { Order } from '../../order/entities/order.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

export class Item {
  id: number;
  name: string;
  description: string;
  price: number = 0.0;
  cost: number = 0.0;
  currency: string = '€';
  category?: string = 'Uncategorized';
  tags?: string = 'Uncategorized';
  quantity: number;
  lot: string = '0';
  createdAt: Date;
  updatedAt: Date;
  supplier: Supplier;
  supplierId: number;
  order?: Order;
  orderId?: number;
}
