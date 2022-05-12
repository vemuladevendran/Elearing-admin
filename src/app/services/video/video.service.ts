import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoFormDetails: any;
  contentType: any;
  constructor(private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get pre signed url
  getPreSignedUrl(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/video/upload`;
    return lastValueFrom(this.http.post(url, data));
  }

  getAwsVideoUrl(preSignedUrl: string, file: File): Promise<any> {
    this.contentType = file.type;
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', file.type);
    return lastValueFrom(this.http.put(preSignedUrl, file));
  }

  // create course video
  createCourseVideo(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/video`;
    return lastValueFrom(this.http.post(url, data));
  }

  // delete video
  deleteVideo(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/video/${id}`;
    return lastValueFrom(this.http.delete(url));
  }
}
