import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get pre signed url
  getPreSignedUrl(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/video/upload`;
    return lastValueFrom(this.http.post(url, data));
  }

  getAwsVideoUrl(preSignedUrl: string, data: File): Promise<any> {
    const url = preSignedUrl;
    const headers = new HttpHeaders();
    headers.append('Content-Type', data.type);
    return lastValueFrom(this.http.put(url, data, { headers: headers }));
  }
}
