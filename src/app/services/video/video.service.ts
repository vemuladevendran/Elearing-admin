import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoFormDetails: any;
  
  constructor(private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get pre signed url
  getPreSignedUrl(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/video/upload`;
    return lastValueFrom(this.http.post(url, data));
  }

  getAwsVideoUrl(preSignedUrl: string, file: File): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', file.type);
    return lastValueFrom(this.http.put(preSignedUrl, file, { headers: headers }));
  }
}
