import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get pending request
  getPendingRequest(filters: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/pending-request`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // approve student
  approveRequest(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/approve-student/${id}`;
    return lastValueFrom(this.http.put(url, {}))
  }

  // reject student
  rejectRequest(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/dismiss-student/${id}`;
    return lastValueFrom(this.http.delete(url))
  }
}