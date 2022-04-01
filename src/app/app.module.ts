import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppShellModule } from './components/app-shell/app-shell.module';
import { CommonComponentModule } from './components/common-components/common-component.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { LoaderService } from './services/loader/loader.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/token/token.service';
import { ServiceWorkerModule } from '@angular/service-worker';
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
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
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
