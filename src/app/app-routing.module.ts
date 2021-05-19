import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LauncherModule } from './launcher/launcher.module';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', loadChildren: () => import('./launcher/launcher.module').then(m => m.LauncherModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            LauncherModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
