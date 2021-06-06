import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { PortalLayoutComponent } from './portal/portal-layout.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { ContactUsComponent } from './website/contact-us/contact-us.component';
import { FaqComponent } from './website/faq/faq.component';
import { HomeComponent } from './website/home/home.component';
import { TermsComponent } from './website/terms/terms.component';
import { SiteLayoutComponent } from './website/website-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: '', component: HomeComponent, pathMatch: 'full' }],
  },
  {
    path: 'about-us',
    component: SiteLayoutComponent,
    children: [{ path: '', component: AboutUsComponent }],
  },
  {
    path: 'terms',
    component: SiteLayoutComponent,
    children: [{ path: '', component: TermsComponent }],
  },
  {
    path: 'faq',
    component: SiteLayoutComponent,
    children: [{ path: '', component: FaqComponent }],
  },
  {
    path: 'contact-us',
    component: SiteLayoutComponent,
    children: [{ path: '', component: ContactUsComponent }],
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'reset-password',
    component: AuthLayoutComponent,
    children: [{ path: '', component: ResetPasswordComponent }],
  },
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'basic-ui',
        loadChildren: () =>
          import('./portal/basic-ui/basic-ui.module').then((m) => m.BasicUiModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./portal/charts/charts.module').then((m) => m.ChartsDemoModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./portal/forms/form.module').then((m) => m.FormModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./portal/tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./portal/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general-pages',
        loadChildren: () =>
          import('./portal/general-pages/general-pages.module').then(
            (m) => m.GeneralPagesModule
          ),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./portal/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'error-pages',
        loadChildren: () =>
          import('./portal/error-pages/error-pages.module').then(
            (m) => m.ErrorPagesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
