import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get admin
  getAdmins(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/admin`;
    return lastValueFrom(this.http.get(url));
  }

  // create new admin
  createAdmin(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/admin`;
    return lastValueFrom(this.http.post(url, data))
  }

  // delete admin
  deleteAdmin(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/admin/${id}`;
    return lastValueFrom(this.http.delete(url))
  }
}
