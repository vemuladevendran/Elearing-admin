import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn = this.auth.isLoggedIn();
    const loginPage = route.routeConfig?.path === 'login';

    if (isLoggedIn && ['login', 'signup'].some(x => route.routeConfig?.path === x)) {
      this.router.navigate(['/books']);
      return false;
    }

    if (!isLoggedIn && !['login', 'signup'].some(x => route.routeConfig?.path === x)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;

  }

}
