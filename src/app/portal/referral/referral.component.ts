import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  loading: boolean=false;
  activeInviteesCount = null;
  submitted: boolean;
  constructor(
    private referralService: ReferralService,
    private alertService: AlertService
  ) {}
  email = new FormControl('', [Validators.required,Validators.maxLength(50)]);
  inviteeList: any;
  ngOnInit() {
    this.referralService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.activeInviteesCount = response.data;
      });
    this.referralService.getAllInvitees().pipe(first())
      .subscribe((response) => {
        this.inviteeList = response.data;
      });
  }
  sendInvitation(emailValue: any) {
    this.submitted = true;
    if (emailValue.invalid) {
      return;
    }
    const param: Referral = {
      email: emailValue.value,
    };
    this.loading = true;
    this.referralService
      .sendInvitation(param)
      .pipe(first())
      .subscribe((response) => {
        this.loading = false;
        if (response.hasError) {
          this.alertService.error(response.errorMessage);
        } else {
          this.alertService.success('Invitation was sent successfully');
        }
      },
      () => {
        this.loading = false;
        this.alertService.error('Something went wrong.');
      });
  }
}
