import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { menuItems as menuList } from './sidenav-items';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  menuItems = menuList;
  user: any;
  mobileQuery = this.media.matchMedia('(max-width: 600px)');
  title = '';
  constructor(
    private media: MediaMatcher,
    private auth: AuthService,
    // private dialog: MatDialog,
    private seo: SeoService,
    private router: Router,
    private token: TokenService,
    private loaderService: LoaderService
  ) {
  }

  async ngOnInit() {
    // if (this.router.url === '/') {
    //   this.router.navigate(['']);
    // }
    // await this.setUserDetails();
    // this.getUserDetails();
  }

  getUserDetails() {
    this.user = this.token.getUserName();
  }

  async setUserDetails(): Promise<void> {
    try {
      this.loaderService.show();
      const data = await this.auth.getUserDetails();
      this.token.setUserName(data.user);
    } catch (error) {
      console.log(error);
      this.auth.logout();
    } finally {
      this.loaderService.hide();
    }
  }

}
