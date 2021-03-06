import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  // get books
  getBooks(filters?: any, page?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book`;
    return lastValueFrom(this.http.get(url, {
      params: {
        ...filters,
        page: page || 1
      },
    }));
  }

  // create book
  createBook(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book`;
    return lastValueFrom(this.http.post(url, data));
  }

  // update book
  updateBook(id: string, data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/${id}`;
    return lastValueFrom(this.http.put(url, data));
  }

  // get book by id
  getBookById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // get book by Code
  getBookByCode(accessCode: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/access-code`;
    return lastValueFrom(this.http.post(url, { accessCode: accessCode }));
  }

  // delete book
  deleteBook(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/${id}`;
    return lastValueFrom(this.http.delete(url));
  }

  // get books category
  getBooksCategory(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/category`;
    return lastValueFrom(this.http.get(url));
  }

  // visit book
  bookVisited(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/visit/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  // most visited books
  mostVisitedBooks(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book/most-visited-books`;
    return lastValueFrom(this.http.get(url));
  }

}
