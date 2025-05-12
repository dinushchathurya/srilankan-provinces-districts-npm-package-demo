import { Controller, Get, Param } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  getProvinces() {
    return this.provincesService.getProvinces();
  }

  @Get(':name')
  getProvince(@Param('name') name: string) {
    return this.provincesService.getProvince(name);
  }

  @Get(':name/districts')
  getDistricts(@Param('name') name: string) {
    return this.provincesService.getDistricts(name);
  }
} 