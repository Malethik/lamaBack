import { Order } from '../../order/entities/order.entity';

export class Costumers {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  Order: Order[];
}
