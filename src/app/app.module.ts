import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { BackOfficeComponent } from './backOffice/backOffice.component';
import { AboutUsComponent } from './site-layout/about-us/about-us.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { RegisterComponent } from './auth-layout/register/register.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { ContactUsComponent } from './site-layout/contact-us/contact-us.component';
import { FaqComponent } from './site-layout/faq/faq.component';
import { HomeComponent } from './site-layout/home/home.component';
import { TermsComponent } from './site-layout/terms/terms.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    AboutUsComponent,
    TermsComponent,
    ContactUsComponent,
    FaqComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BackOfficeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
