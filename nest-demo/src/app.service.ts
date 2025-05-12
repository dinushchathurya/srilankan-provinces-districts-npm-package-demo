import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Nest.js Demo - Sri Lanka Provinces API</h1>
      <p>Try the following endpoints:</p>
      <ul>
        <li><a href="/provinces">/provinces</a> - Get all provinces</li>
        <li><a href="/provinces/Western">/provinces/Western</a> - Get information about Western province</li>
        <li><a href="/provinces/Western/districts">/provinces/Western/districts</a> - Get districts in Western province</li>
      </ul>
    `;
  }
}

