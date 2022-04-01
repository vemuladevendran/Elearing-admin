import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  user: any;
  private tokenKey = 'AUTH_TOKEN';

  constructor() { }

  saveToken(data: any) {
    window.localStorage.setItem(this.tokenKey, data);
  }

  getToken() {
    return window.localStorage.getItem(this.tokenKey);
  }

  isTokenExist() {
    return !!this.getToken();
  }

  removeToken() {
    window.localStorage.removeItem(this.tokenKey);
  }

  setUserName(user: any) {
    this.user = user;
  }
  getUserName() {
    return this.user;
  }
}
