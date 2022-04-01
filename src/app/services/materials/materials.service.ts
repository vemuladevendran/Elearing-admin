import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // upload materials
  uploadMaterials(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/material`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get materials
  getMaterials(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/material`;
    return lastValueFrom(this.http.get(url));
  }

  // delete materials
  deleteMaterial(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/material/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}
