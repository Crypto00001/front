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
  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.dashboardData=[
      {
          'itemName': 'This Month',
          'itemValue': '$86,589'
      },
      {
          'itemName': 'Active Plans',
          'itemValue': '18k'
      },
      {
          'itemName': 'Revenue Generated',
          'itemValue': '$840k'
      },
      {
          'itemName': 'In Progress',
          'itemValue': '46'
      },
      {
          'itemName': 'Last Month',
          'itemValue': '$73,683'
      },
      {
          'itemName': 'Goal Overview',
          'itemValue': '83%'
      },
      {
          'itemName': 'Members Gained',
          'itemValue': '12k'
      },
      {
          'itemName': 'Completed',
          'itemValue': '312'
      },
      {
          'itemName': 'Average Monthly Profit',
          'itemValue': '$52k'
      }
  ];
    // this.dashboardService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe((data) => {
    //     this.dashboardData = data;
    //   });
  }
}
