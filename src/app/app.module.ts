import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppShellModule } from './components/app-shell/app-shell.module';
import { CommonComponentModule } from './components/common-components/common-component.module';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { LoaderService } from './services/loader/loader.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/token/token.service';
import { environment } from '../environments/environment';

// HttpClientModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppShellModule,
    HttpClientModule,
    CommonComponentModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
