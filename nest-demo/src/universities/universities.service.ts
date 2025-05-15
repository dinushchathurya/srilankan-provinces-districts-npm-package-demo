import { Injectable, NotFoundException } from "@nestjs/common";
import * as uniData from "@dinush/srilankan-universities-faculties-degrees";

@Injectable()
export class UniversitiesService {
  getUniversities() {
    return uniData.getUniversities();
  }

  getUniversity(name: string) {
    // Try to use modern API first if available
    if (typeof uniData.getUniversity === "function") {
      const university = uniData.getUniversity(name);
      if (university) {
        return university;
      }
    }

    // Fallback to checking if university exists in legacy API
    const allUniversities = uniData.getUniversities();
    if (allUniversities.includes(name)) {
      return { name };
    }

    throw new NotFoundException(`University ${name} not found`);
  }

  getFaculties(university: string) {
    const faculties = uniData.getFaculties(university);
    if (faculties && faculties.length > 0) {
      return faculties;
    }
    throw new NotFoundException(
      `University ${university} not found or has no faculties`
    );
  }

  getDegrees(university: string, faculty: string) {
    const degrees = uniData.getDegrees(university, faculty);
    if (degrees && degrees.length > 0) {
      return degrees;
    }
    throw new NotFoundException(
      `University or faculty not found or has no degrees`
    );
  }
}
