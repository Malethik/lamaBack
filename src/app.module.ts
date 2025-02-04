import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CostumersModule } from './costumers/costumers.module';
import { SupplierModule } from './supplier/supplier.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';

import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    UserModule,
    PrismaModule,
    CostumersModule,
    SupplierModule,
    ItemModule,
    OrderModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
