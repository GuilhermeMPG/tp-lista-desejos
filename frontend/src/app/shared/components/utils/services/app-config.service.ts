import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = 'https://lista-backend-production.up.railway.app';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
