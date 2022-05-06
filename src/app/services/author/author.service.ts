import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get authors
  getAuthors(page?: number): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/author`;
    return lastValueFrom(this.http.get(url, {
      params: { page: page || 1 },
    }));
  }

  // get author by id
  getAuthorById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/author/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // create new author
  createAuthor(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/author`;
    return lastValueFrom(this.http.post(url, data))
  }

  // update new author
  updateAuthor(data: any, id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/author/${id}`;
    return lastValueFrom(this.http.put(url, data))
  }

  // delete author
  deleteAuthor(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/author/${id}`;
    return lastValueFrom(this.http.delete(url))
  }
}
