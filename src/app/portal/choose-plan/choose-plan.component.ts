import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {AlertService} from 'src/app/_services/alert.service';
import {UserPlanService} from 'src/app/_services/user-plan.service';
import {WalletService} from 'src/app/_services/wallet.service';
import {ReferralService} from '../../_services/referral.service';
import {PlanService} from '../../_services/plan.service';
import {Plan} from '../../_models/plan';
import {dateComparator} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  walletData: any;
  plan: any;
  planList: Array<any>;
  cryptoList: Array<any> = [
    {key: 1, value: 'Bitcoin'},
    {key: 2, value: 'Etherium'},
    {key: 3, value: 'Litecoin'},
    {key: 4, value: 'Zcash'},
  ];

  constructor(private formBuilder: FormBuilder,
              private referralService: ReferralService,
              private alertService: AlertService,
              private planService: PlanService,
              private userPlanService: UserPlanService,
              private walletService: WalletService) {
  }

  activeInviteesCount = -1;
  popup = false;
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

    this.planService
      .getAll()
      .pipe(first())
      .subscribe((response: any) => {
        this.planList = response.map(item => ({
          value: item.name, planDetail: {
            percentage: item.profitPercent,
            month: item.duration,
            referralPercent: item.referralPercent,
            minimumDeposit: item.minimumDeposit
          }
        }));
      });
  }

  get f() {
    return this.form.controls;
  }

  getActiveInviteesCount() {
    if (this.activeInviteesCount < 0) {
      this.referralService
        .getAll()
        .pipe(first())
        .subscribe((response) => {
          this.activeInviteesCount = response.data;
        });
    }

    return this.activeInviteesCount;
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
    this.balance = this.walletData.filter(q => q.walletType === item)[0].availableBalance
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
    if (this.form.controls.investmentAmount.value !== '')
      this.finalProfit = this.calculateProfitPlan(Number(this.form.controls.investmentAmount.value));
  }

  onBalanceChanged($event: Event) {
    this.finalProfit = this.calculateProfitPlan(Number($event));
  }

  calculateProfitPlan(investmentValue: number) {
    this.plan = this.planList.find(a => a.value === this.form.controls.planName.value);
    const profitPercentage = this.toPercentage(this.plan.planDetail.percentage);
    const referralPercentage = this.toPercentage(this.plan.planDetail.referralPercent) * this.activeInviteesCount;
    return parseFloat((investmentValue + (investmentValue * (profitPercentage + referralPercentage))).toFixed(8));
  }

  toPercentage(percentage: number) {
    return (percentage / 100);
  }
}
