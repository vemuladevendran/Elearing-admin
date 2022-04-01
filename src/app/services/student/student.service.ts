import { lastValueFrom } from 'rxjs';
import { SettingsService } from './../settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private settings: SettingsService) { }

  getStudents(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  getStudentById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  getStudentByRollNumber(rollNumber: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/rollNumber/${rollNumber}`;
    return lastValueFrom(this.http.get(url));
  }

  createStudent(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student`;
    return lastValueFrom(this.http.post(url, data));
  }

  updateStudent(data: any, id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.put(url, data));
  }

  deleteStudent(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.delete(url));
  }

  promoteStudents(year: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/promote`;
    return lastValueFrom(this.http.post(url, { selectedYear: year }));
  }

  getPassedOutStudents(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/passed-out`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  getPassedOutStudentByRollNumber(rollNumber: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/passed-out/${rollNumber}`;
    return lastValueFrom(this.http.get(url));
  }

  enableMembership(id: string, year: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/membership-renewal/${id}`;
    return lastValueFrom(this.http.post(url, { years: year }));
  }
}
