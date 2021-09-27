import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { UserPlanService } from 'src/app/_services/user-plan.service';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss'],
})
export class StatusReportComponent implements OnInit {
  userPlanList: any;

  constructor( private formBuilder: FormBuilder,
    private alertService:AlertService,
    private userPlanService:UserPlanService) { 
  }

  ngOnInit() {
    this.userPlanService.getAll().pipe(first())
    .subscribe((response) => {
      this.userPlanList = response.data;
    });
  }

}
