import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProvincesModule } from "./province/provinces.module";
import { UniversitiesModule } from "./universities/universities.module";

@Module({
  imports: [ProvincesModule, UniversitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
