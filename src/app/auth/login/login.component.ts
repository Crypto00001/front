import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AutoLogoutService } from 'src/app/_services/auto-logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  captchaEnabeld = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private autoLogoutService: AutoLogoutService
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      captcha: [''],
    });
    if (JSON.parse(localStorage.getItem('cpt'))) {
      this.captchaEnabeld = true;
      this.form.controls.captcha.setValidators(Validators.required);
      this.form.get('cpt').updateValueAndValidity();
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) return;

    this.loading = true;
    this.accountService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.submitted = false;
          if (data.hasError) {
            if (data.captcha) {
              localStorage.setItem('cpt', JSON.stringify(true));
              this.alertService.error(data.errorMessage);
              this.captchaEnabeld = true;
              this.form.controls.captcha.setValidators(Validators.required);
              this.form.get('captcha').updateValueAndValidity();
              this.form.controls.captcha.setValue('');
            } else {
              this.alertService.error(data.errorMessage);
              localStorage.setItem('cpt', JSON.stringify(false));
              this.captchaEnabeld = false;
              this.form.controls.captcha.clearValidators();
              this.form.get('captcha').updateValueAndValidity();
              this.form.controls.captcha.setValue('');
            }
          } else {
            localStorage.setItem('cpt', JSON.stringify(false));
            this.autoLogoutService.reset();
            this.router.navigate([this.returnUrl]).then(() => {
              window.location.reload();
            });
          }
        },
        () => {
          this.loading = false;
          this.submitted = false;
          this.alertService.error('Something went wrong.');
        }
      );
  }
}
