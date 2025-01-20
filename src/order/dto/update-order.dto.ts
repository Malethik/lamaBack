import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class UpdateOrderItemDto {
  id: number; // L'id è necessario per identificare l'articolo da aggiornare
  quantity: number;
}
