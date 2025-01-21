export class CreateItemDto {
  id: number; // Non è necessario, l'ID viene generato automaticamente
  name: string;
  price: number;
  cost?: number; // Opzionale, valore predefinito 0.0
  currency?: string; // Opzionale, valore predefinito "EURO"
  category?: string; // Opzionale, valore predefinito "Uncategorized"
  tags?: string; // Opzionale, valore predefinito "Uncategorized"
  description: string;
  quantity: number;
  lot?: string; // Opzionale, valore predefinito "0"
  orderId?: number; // Opzionale poiché l'ordine è opzionale
  supplierId: number; // Deve essere fornito, singolo numero
}
