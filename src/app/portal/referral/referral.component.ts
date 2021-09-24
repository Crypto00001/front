import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Referral } from 'src/app/_models/referral';
import { AlertService } from 'src/app/_services/alert.service';
import { ReferralService } from 'src/app/_services/referral.service';
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  loading: boolean;
  referralData = null;
  constructor(
    private referralService: ReferralService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.referralService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.referralData = response.data;
      });
  }
  sendInvitation(emailValue: string) {
    const param: Referral = {
      email: emailValue,
    };

    this.referralService
      .sendInvitation(param)
      .pipe(first())
      .subscribe((response) => {
        if (response.hasError) {
          this.alertService.error(response.errorMessage);
          this.loading = false;
        } else {
          this.alertService.success('Invitation was sent successfully');
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      });
  }
}
