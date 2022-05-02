import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // create new course
  createCourse(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/course`;
    return lastValueFrom(this.http.post(url, data));
  }

  // update course details
  updateCourse(id: string, data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/course/${id}`;
    return lastValueFrom(this.http.put(url, data));
  }

  // get course details
  getCourses(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/course`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // get course details by id
  getCourseById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/course/${id}`;
    return lastValueFrom(this.http.get(url));
  }

}
