import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Nest.js Demo - Sri Lankan Data API</h1>
      
      <h2>Provinces & Districts API</h2>
      <ul>
        <li><a href="/provinces">/provinces</a> - Get all provinces</li>
        <li><a href="/provinces/Western">/provinces/Western</a> - Get information about Western province</li>
        <li><a href="/provinces/Western/districts">/provinces/Western/districts</a> - Get districts in Western province</li>
      </ul>
      
      <h2>Universities, Faculties & Degrees API</h2>
      <ul>
        <li><a href="/universities">/universities</a> - Get all universities</li>
        <li><a href="/universities/University%20of%20Colombo">/universities/University of Colombo</a> - Get information about University of Colombo</li>
        <li><a href="/universities/University%20of%20Colombo/faculties">/universities/University of Colombo/faculties</a> - Get faculties in University of Colombo</li>
        <li><a href="/universities/University%20of%20Colombo/faculties/Faculty%20of%20Law/degrees">/universities/University of Colombo/faculties/Faculty of Law/degrees</a> - Get degrees in Faculty of Law</li>
      </ul>
    `;
  }
}
