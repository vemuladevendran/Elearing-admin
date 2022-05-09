import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get orders
  getOrders(filters?: any, page?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/order`;
    return lastValueFrom(this.http.get(url, {
      params: {
        ...filters,
        page: page || 1
      },
    }));
  }
}
