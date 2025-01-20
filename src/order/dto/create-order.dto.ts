export class CreateOrderDto {
  total: number;
  items: CreateOrderItemDto[]; // Lista di articoli con quantità
  sended: boolean;
  costumersId: number;
}

export class CreateOrderItemDto {
  id: number;
  quantity: number; // Quantità dell'articolo
  itemId: number; // ID dell'articolo
}
