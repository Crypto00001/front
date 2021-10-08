import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ResetPasswordRequest } from 'src/app/_models/resetPasswordRequest';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isResetFormVisible = false;
  submitText: string;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.maxLength(50)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        resetCode: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
    this.submitText = 'Send Reset Code';
  }
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    if (group.get('newPassword') !== null) {
      const pass = group.get('newPassword').value;
      const confirmPass = group.get('confirmPassword').value;
      return pass === confirmPass ? null : { notSame: true };
    }
    return { notSame: false };
  };
  sendResetPassword() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    if (!this.isResetFormVisible) {
          // stop here if form is invalid
    if (this.form.controls.email.invalid) return;

      const resetPasswordRequest: ResetPasswordRequest = {
        email: this.f.email.value,
      };
      this.loading = true;
      this.accountService
        .resetPasswordRequest(resetPasswordRequest)
        .pipe(first())
        .subscribe((data) => {
          this.loading = false;
          this.submitted = false;
          if (data.hasError) {
            this.alertService.error(data.errorMessage);
          } else {
            this.submitText = 'Reset Password';
            this.isResetFormVisible = true;
            this.alertService.success(
              'Reset code was sent to your Email address',
              {
                keepAfterRouteChange: true,
              }
            );
          }
        },
        () => {
          this.loading = false;
          this.submitted = false;
          this.alertService.error('Something went wrong.');
        });
    } else {
      // stop here if form is invalid
      if (this.form.invalid) return;
      this.loading = true;
      this.accountService
        .doResetPassword(this.form.value)
        .pipe(first())
        .subscribe((data) => {
          this.loading = false;
          this.submitted = false;
          if (data.hasError) {
            this.submitText = 'Send Reset Code';
            this.alertService.error(data.errorMessage);
          } else {
            this.isResetFormVisible = false;
            this.submitText = 'Send Reset Code';
            this.alertService.success('Password was successfully reset', {
              keepAfterRouteChange: true,
            });
          }
        },
        () => {
          this.loading = false;
          this.submitted = false;
          this.alertService.error('Something went wrong.');
        });
    }
  }
}
