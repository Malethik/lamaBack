import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Post()
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumersService.create(createCostumerDto);
  }

  @Get()
  findAll() {
    return this.costumersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.costumersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumersService.update(id, updateCostumerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.costumersService.remove(id);
  }
}
