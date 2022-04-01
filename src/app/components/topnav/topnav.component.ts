import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  isLoggedIn = true;
  @Input() snav: any;
  title = '';
  timeDate = new Date();
  @Input() userName = '';
  constructor(
    private auth: AuthService,
  ) {
    setInterval(() => {
      this.timeDate = new Date();
    }, 1);
  }

  ngOnInit() {
  }


  toggleSideNav() {
    this.snav?.toggle();
  }

  showLoginIcon() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    console.log('Clicked On Logout');
  }

}
