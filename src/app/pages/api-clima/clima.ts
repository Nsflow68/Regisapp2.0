import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  private apiKey = 'f1233984f682f7276df87718e3cc3e57';
  private apiUrl = 'http://api.weatherstack.com/current';

  constructor(private http: HttpClient) {}

  consultarClima(ciudad: string) {
    const params = {
      access_key: this.apiKey,
      query: ciudad,
    };

    return this.http.get(this.apiUrl, { params });
  }
}
