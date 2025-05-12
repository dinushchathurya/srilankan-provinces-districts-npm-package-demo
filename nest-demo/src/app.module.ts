import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
  imports: [ProvincesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 