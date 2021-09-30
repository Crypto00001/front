import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

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
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      captcha: [''],
    });
    if (JSON.parse(localStorage.getItem('captcha'))) {
      this.captchaEnabeld = true;
      this.form.controls.captcha.setValidators(Validators.required);
      this.form.get('captcha').updateValueAndValidity();
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
      .subscribe((data) => {
        if (data.hasError) {
          this.loading = false;
          if (data.captcha) {
            localStorage.setItem('captcha', JSON.stringify(true));
            this.captchaEnabeld = true;
            this.form.controls.captcha.setValidators(Validators.required);
            this.form.get('captcha').updateValueAndValidity();
            this.form.controls.captcha.setValue('');
            this.submitted = false;
          } else {
            this.alertService.error(data.errorMessage);
            localStorage.setItem('captcha', JSON.stringify(false));
            this.captchaEnabeld = false;
            this.form.controls.captcha.clearValidators();
            this.form.get('captcha').updateValueAndValidity();
            this.form.controls.captcha.setValue('');
          }
        } else 
        {
          localStorage.setItem('captcha', JSON.stringify(false));
          this.router.navigate([this.returnUrl]).then(() => {
            window.location.reload();
          });
        }
      });
  }
}
