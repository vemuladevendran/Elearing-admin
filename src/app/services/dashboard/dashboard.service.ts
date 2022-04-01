import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get dashboard count
  getDashboardCount(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/admin/dashboard`;
    return lastValueFrom(this.http.get(url));
  }

  // create youtube link
  createYoutubeLive(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/youtube`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get youtube link

  getYoutubeLink(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/youtube`;
    return lastValueFrom(this.http.get(url));
  }
}
