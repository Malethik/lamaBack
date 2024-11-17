export class CreateItemDto {
  name: string;
  price: number;
  description: string;
  quantity: number;
  orderId?: number; // opzionale poiché l'ordine è opzionale
  supplierId: number; // deve essere un singolo numero
}
