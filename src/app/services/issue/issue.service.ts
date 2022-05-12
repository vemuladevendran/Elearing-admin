import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get issuses
  getIssueList(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/issue`;
    return lastValueFrom(this.http.get(url));
  }

  // get issuses by id
  getIssueById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/issue/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // delete
  deleteIssue(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/issue/${id}`;
    return lastValueFrom(this.http.delete(url));
  }

}
