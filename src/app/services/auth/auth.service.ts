import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { lastValueFrom } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private router: Router,
    private token: TokenService,
  ) {
  }

  login(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/admin/login`;
    return lastValueFrom(this.http.post(url, data))
  }

  getUserDetails(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/admin/me`;
    return lastValueFrom(this.http.get(url))
  }


  isLoggedIn() {
    return this.token.isTokenExist();
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
