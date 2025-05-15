import { Controller, Get, Param } from "@nestjs/common";
import { UniversitiesService } from "./universities.service";

@Controller("universities")
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  getUniversities() {
    return this.universitiesService.getUniversities();
  }

  @Get(":name")
  getUniversity(@Param("name") name: string) {
    return this.universitiesService.getUniversity(name);
  }

  @Get(":name/faculties")
  getFaculties(@Param("name") name: string) {
    return this.universitiesService.getFaculties(name);
  }

  @Get(":uniName/faculties/:facName/degrees")
  getDegrees(
    @Param("uniName") uniName: string,
    @Param("facName") facName: string
  ) {
    return this.universitiesService.getDegrees(uniName, facName);
  }
}
