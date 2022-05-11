import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class EnroleCourseService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get enrole request course
  getEnroleRequestCourse(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/enrol-course`;
    return lastValueFrom(this.http.get(url));
  }

  // approve course request
  acceptCourseRequest(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/enrol-course/accept`;
    return lastValueFrom(this.http.post(url, data));
  }

  // reject course request
  rejectCourseRequest(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/enrol-course/reject`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get enrole courses
  getEnroleCourses(filters: any, page: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/enrol-course/access`;
    return lastValueFrom(this.http.get(url, {
      params: {
        ...filters,
        page: page || 1
      },
    }));
  }
}
