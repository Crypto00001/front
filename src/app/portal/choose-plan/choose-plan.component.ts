import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService} from 'src/app/_services/alert.service';
import {UserPlanService} from 'src/app/_services/user-plan.service';
import {WalletService} from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  walletData: any;
  planPercentage: any;
  planMonth: any;
  planList: Array<any> = [
    {value: 'Bronze Plan', planDetail: {percentage: 0.25, month: 1}},
    {value: 'Silver Plan', planDetail: {percentage: 0.35, month: 2}},
    {value: 'Gold Plan', planDetail: {percentage: 0.5, month: 3}}
  ];
  cryptoList: Array<any> = [
    {key: 1, value: 'Bitcoin'},
    {key: 2, value: 'Etherium'},
    {key: 3, value: 'Litecoin'},
    {key: 4, value: 'Zcash'},
  ];

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private userPlanService: UserPlanService,
              private walletService: WalletService) {
  }

  popup = false
  defaultPlan: string = null;
  balance: string = null;
  form: FormGroup;
  loading = false;
  submitted = false;
  finalProfit: any;

  ngOnInit() {
    this.form = this.formBuilder.group({
      planName: ['', Validators.required],
      walletType: [1, Validators.required],
      investmentAmount: ['', Validators.required]
    });

  }

  get f() {
    return this.form.controls;
  }

  async invest(plan: any, percentage: any, month: any) {
    this.finalProfit = 0;
    this.form.controls.planName.setValue(plan);
    this.form.controls.walletType.setValue(1);
    this.form.controls.investmentAmount.setValue('');
    this.walletData = (await this.walletService.getAll()).data;
    this.balance = this.walletData.filter(q => q.walletType === 1)[0].availableBalance
    this.popup = true;
  }

  cryptoChange(item) {
    this.balance = this.walletData.filter(q => q.walletType == item)[0].availableBalance
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userPlanService.registerPlan(this.form.value)
      .pipe(first())
      .subscribe(
        response => {
          this.loading = false;
          this.submitted = false;
          if (response.hasError) {
            this.alertService.error(response.errorMessage);
          } else {
            this.alertService.success('Investment plan started successfully!', {keepAfterRouteChange: true});
            this.popup = false;
          }
        },
        () => {
          this.loading = false;
          this.submitted = false;
          this.alertService.error('Something went wrong.');
        });
  }

  onPlanChanged($event: Event) {
    this.planPercentage = this.planList.find(a => a.value === $event).planDetail.percentage;
    this.planMonth = this.planList.find(a => a.value === $event).planDetail.month;
    const investmentValue = Number(this.form.controls.investmentAmount.value);
    this.finalProfit = parseFloat((investmentValue + (investmentValue * this.planPercentage)).toFixed(8));
  }

  onBalanceChanged($event: Event) {
    this.planPercentage = this.planList.find(a => a.value === this.form.controls.planName.value).planDetail.percentage;
    this.planMonth = this.planList.find(a => a.value === this.form.controls.planName.value).planDetail.month;
    const investmentValue = Number($event);
    this.finalProfit = parseFloat((investmentValue + (investmentValue * this.planPercentage)).toFixed(8));
  }
}
