import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChoosePlanComponent } from './portal/choose-plan/choose-plan.component';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { DepositComponent } from './portal/deposit/deposit.component';
import { EditProfileComponent } from './portal/edit-profile/edit-profile.component';
import { PlansReportComponent } from './portal/plans-report/plans-report.component';
import { PortalLayoutComponent } from './portal/portal-layout.component';
import { ReferralComponent } from './portal/referral/referral.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { ContactUsComponent } from './website/contact-us/contact-us.component';
import { FaqComponent } from './website/faq/faq.component';
import { HomeComponent } from './website/home/home.component';
import { TermsComponent } from './website/terms/terms.component';
import { SiteLayoutComponent } from './website/website-layout.component';
import { AuthGuard } from './_helpers/auth.guard';

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
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'choose-plan', component: ChoosePlanComponent, canActivate: [AuthGuard] },
      { path: 'wallet', component: DepositComponent, canActivate: [AuthGuard] },
      { path: 'plans-report', component: PlansReportComponent, canActivate: [AuthGuard] },
      { path: 'refferal', component: ReferralComponent, canActivate: [AuthGuard] },
      { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
