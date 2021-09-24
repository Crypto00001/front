import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DashboardService } from 'src/app/_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData = null;
  public searchDashboard: any = '';
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.dashboardData = data;
      });
  }
}
