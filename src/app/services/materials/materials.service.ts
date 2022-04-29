import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  constructor(private http: HttpClient,
    private settings: SettingsService
  ) { }

  // create course material
  createCourseMaterial(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/material`;
    return lastValueFrom(this.http.post(url, data));
  }
}
