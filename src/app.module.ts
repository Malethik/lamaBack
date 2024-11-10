import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CostumersModule } from './costumers/costumers.module';
import { SupplierModule } from './supplier/supplier.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UserModule, PrismaModule, CostumersModule, SupplierModule, ItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
