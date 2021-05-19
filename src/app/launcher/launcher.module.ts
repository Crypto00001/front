import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { TodoListComponent } from '../apps/todo-list/todo-list.component';
import { TodoComponent } from '../apps/todo-list/todo/todo.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ContentAnimateDirective } from '../shared/directives/content-animate.directive';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { LauncherRoutingModule } from './launcher-routing.module';
import { LauncherComponent } from './launcher.component';



@NgModule({
  declarations: [
    LauncherComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective
  ],
  imports: [
    CommonModule,
    LauncherRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [ThemeService]
})
export class LauncherModule { }
