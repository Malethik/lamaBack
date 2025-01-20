import { Costumers } from '../../costumers/entities/costumer.entity';
import { Item } from '../../item/entities/item.entity';
export class Order {
  id: number;
  total: number;
  sended: boolean;
  items: OrderItem[]; // Ogni ordine ha uno o più articoli
  costumers: Costumers;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderItem {
  quantity: number; // Quantità dell'articolo specifico nell'ordine
  item: Item; // Oggetto (articolo) associato
  itemId: number; // ID dell'articolo
  orderId: number; // ID dell'ordine
}
