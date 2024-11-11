import { Costumers } from '../../costumers/entities/costumer.entity';
import { Item } from '../../item/entities/item.entity';

export class Order {
  id: number;
  total: number;
  item: Item[];
  costumers: Costumers;
  createdAt: Date;
  updatedAt: Date;
}
