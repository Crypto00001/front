import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './site-layout/about-us/about-us.component';
import { AppComponent } from './app.component';
import { BackOfficeComponent } from './backOffice/backOffice.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { RegisterComponent } from './auth-layout/register/register.component';
import { HomeComponent } from './site-layout/home/home.component';
import { TermsComponent } from './site-layout/terms/terms.component';
import { FaqComponent } from './site-layout/faq/faq.component';
import { ContactUsComponent } from './site-layout/contact-us/contact-us.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

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
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'basic-ui',
        loadChildren: () =>
          import('./backOffice/basic-ui/basic-ui.module').then((m) => m.BasicUiModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./backOffice/charts/charts.module').then((m) => m.ChartsDemoModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./backOffice/forms/form.module').then((m) => m.FormModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./backOffice/tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./backOffice/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general-pages',
        loadChildren: () =>
          import('./backOffice/general-pages/general-pages.module').then(
            (m) => m.GeneralPagesModule
          ),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./backOffice/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'error-pages',
        loadChildren: () =>
          import('./backOffice/error-pages/error-pages.module').then(
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
