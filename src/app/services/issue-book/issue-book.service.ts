import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class IssueBookService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }


  // issue book
  issueBook(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue`;
    return lastValueFrom(this.http.post(url, data));
  }

  // get issued books
  getIssuedBooks(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue/issued-book-list`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // return book
  returnBook(bookId: string, id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue/return-book/${id}`;
    return lastValueFrom(this.http.post(url, { bookId: bookId }));
  }
  // get return books
  getReturnBooks(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue/returned-book-list`;
    return lastValueFrom(this.http.get(url));
  }

  // renewal book
  renewalBook(bookId: string, id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue/renewal-book/${id}`;
    return lastValueFrom(this.http.post(url, { bookId: bookId }));
  }

  // get due books
  getDueBooks(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/book-issue/due-book-list`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }
}
