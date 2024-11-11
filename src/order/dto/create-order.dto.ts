import { Item } from '../../item/entities/item.entity';

export class CreateOrderDto {
  total: number;
  item: Item[];
  costumersId: number;
}
