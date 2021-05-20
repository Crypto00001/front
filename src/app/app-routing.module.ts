import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BackOfficeComponent } from './backOffice/backOffice.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: '', component: HomeComponent, pathMatch: 'full' }],
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
        path: 'user-pages',
        loadChildren: () =>
          import('./user-pages/user-pages.module').then(
            (m) => m.UserPagesModule
          ),
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
