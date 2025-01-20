export class CreateItemDto {
  id: number; // Non è necessario, l'ID viene generato automaticamente
  name: string;
  price: number;
  cost?: number = 0.0; // Opzionale, valore predefinito 0.0
  currency?: string = 'EURO'; // Opzionale, valore predefinito "EURO"
  category?: string = 'Uncategorized'; // Opzionale, valore predefinito "Uncategorized"
  tags?: string = 'Uncategorized'; // Opzionale, valore predefinito "Uncategorized"
  description: string;
  quantity: number;
  lot?: string = '0'; // Opzionale, valore predefinito "0"
  orderId?: number; // Opzionale poiché l'ordine è opzionale
  supplierId: number; // Deve essere fornito, singolo numero
}
