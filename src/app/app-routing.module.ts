import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./auth/login/login.module').then((m) => m.LoginModule),
  // },
  // {
  //   path: 'signup',
  //   loadChildren: () =>
  //     import('./auth/signup/signup.module').then((m) => m.SignupModule),
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () =>
  //     import('./auth/forgot-password/forgot-password.module').then(
  //       (m) => m.ForgotPasswordModule
  //     ),
  // },
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: 'course', loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule) },
      { path: 'course-products', loadChildren: () => import('./pages/course-products/course-products.module').then(m => m.CourseProductsModule) },
      { path: 'books', loadChildren: () => import('./pages/books/books.module').then(m => m.BooksModule) },
      { path: 'authors', loadChildren: () => import('./pages/author/author.module').then(m => m.AuthorModule) },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
