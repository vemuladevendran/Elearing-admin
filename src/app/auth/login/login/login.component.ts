import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordHide = true;
  invalidDetails = ''
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private authServe: AuthService,
    private tokenserve: TokenService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  // clearing error message
  clearErrorMessage() {
    this.invalidDetails = ''
  }

  async login(): Promise<void> {
    // try {
    //   this.loader.show();
    //   const data = await this.authServe.login(this.loginForm.value);

    //   if (!data.token) {
    //     window.alert('Failed to login');
    //     return;
    //   }
    //   this.tokenserve.saveToken(data?.token);
    //   this.tokenserve.setUserName(data?.user);
    //   this.router.navigate(['/books']);
    //   this.invalidDetails = '';
    // } catch (error: any) {
    //   console.log(error);
    //   this.invalidDetails = error?.error.message
    // } finally {
    //   this.loader.hide();
    // }
  }

  ngOnInit(): void { }
}
