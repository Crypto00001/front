import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule, ThemeService } from "ng2-charts";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthLayoutComponent } from "./auth/auth-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { DashboardComponent } from "./portal/dashboard/dashboard.component";
import { AboutUsComponent } from "./website/about-us/about-us.component";
import { ContactUsComponent } from "./website/contact-us/contact-us.component";
import { FaqComponent } from "./website/faq/faq.component";
import { HomeComponent } from "./website/home/home.component";
import { TermsComponent } from "./website/terms/terms.component";
import { SiteLayoutComponent } from "./website/website-layout.component";
import { PortalLayoutComponent } from "./portal/portal-layout.component";
import { ChoosePlanComponent } from "./portal/choose-plan/choose-plan.component";
import { DepositComponent } from "./portal/deposit/deposit.component";
import { ReferralComponent } from "./portal/referral/referral.component";
import { EditProfileComponent } from "./portal/edit profile/edit-profile.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { AlertComponent } from "./shared/alert/alert/alert.component";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { AutoLogoutService } from "./_services/auto-logout.service";
import { SearchDashboardPipe } from "./_pipes/search-dashboard.pipe";
import { StatusReportComponent } from "./portal/status report/status-report.component";
import { NgHcaptchaModule } from "ng-hcaptcha";
import { CookieService } from "ngx-cookie-service";
import { DigitOnlyDirective } from "./_directives/digit-only.directive";
@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    ResetPasswordComponent,
    HomeComponent,
    AboutUsComponent,
    TermsComponent,
    ContactUsComponent,
    FaqComponent,
    LoginComponent,
    StatusReportComponent,
    RegisterComponent,
    ReferralComponent,
    EditProfileComponent,
    DashboardComponent,
    ChoosePlanComponent,
    DepositComponent,
    PortalLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AlertComponent,
    SearchDashboardPipe,
    DigitOnlyDirective
  ],
  imports: [
    NgHcaptchaModule.forRoot({
      siteKey: '3ceb8624-1970-4e6b-91d5-70317b70b670'
  }), 
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [
    ThemeService,
    AutoLogoutService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
