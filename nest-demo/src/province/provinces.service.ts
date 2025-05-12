import { Injectable, NotFoundException } from '@nestjs/common';
import * as provinces from 'srilankan-provinces-districts';

@Injectable()
export class ProvincesService {
  getProvinces() {
    return provinces.getProvinces();
  }

  getProvince(name: string) {
    // Try to use modern API first if available
    if (typeof provinces.getProvince === 'function') {
      const province = provinces.getProvince(name);
      if (province) {
        return province;
      }
    }

    // Fallback to checking if province exists in legacy API
    const allProvinces = provinces.getProvinces();
    if (allProvinces.includes(name)) {
      return { name };
    }

    throw new NotFoundException(`Province ${name} not found`);
  }

  getDistricts(province: string) {
    const districts = provinces.getDistricts(province);
    if (districts && districts.length > 0) {
      return districts;
    }
    throw new NotFoundException(`Province ${province} not found or has no districts`);
  }
}