import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/signup/signup.module').then((m) => m.SignupModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
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
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
      { path: 'student-request', loadChildren: () => import('./pages/pending-student-request/pending-student-request.module').then(m => m.PendingStudentRequestModule) },
      { path: 'students', loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule) },
      { path: 'issue-book-dashboard', loadChildren: () => import('./pages/issue-book-dashboard/issue-book-dashboard.module').then(m => m.IssueBookDashboardModule) },
      { path: 'course-request', loadChildren: () => import('./pages/pending-course-request/pending-course-request.module').then(m => m.PendingCourseRequestModule) },
      { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
      { path: 'purchased-courses', loadChildren: () => import('./pages/purchased-courses/purchased-courses.module').then(m => m.PurchasedCoursesModule) },

      {
        path: '**',
        redirectTo: '/dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
