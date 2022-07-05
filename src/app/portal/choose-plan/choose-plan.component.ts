import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, map, takeUntil} from 'rxjs/operators';
import {AlertService} from 'src/app/_services/alert.service';
import {UserPlanService} from 'src/app/_services/user-plan.service';
import {WalletService} from 'src/app/_services/wallet.service';
import {ReferralService} from '../../_services/referral.service';
import {PlanService} from '../../_services/plan.service';
import {combineLatest, forkJoin, Subject, Subscription} from 'rxjs';


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
    {key: 2, value: 'Ethereum'},
    {key: 3, value: 'Litecoin'},
    {key: 4, value: 'Zcash'},
    {key: 5, value: 'Tether'}
  ];
  private countActive: any;

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

  //unsubscribe$: Subject<void> = new Subject();
  ngOnInit() {
    this.form = this.formBuilder.group({
      planName: ['', Validators.required],
      walletType: [1, Validators.required],
      investmentAmount: ['', Validators.required]
    });

    const statePromise = this.referralService
      .getAll();
    const citiesPromise = this.planService
      .getAll();

    forkJoin([statePromise, citiesPromise]).subscribe((responses) => {
      this.countActive = responses[0].data;
      this.planList = responses[1].map(item => ({
        value: item.name, planDetail: {
          percentage: item.profitPercent,
          month: item.duration,
          referralPercent: item.referralPercent,
          minimumDeposit: item.minimumDeposit
        }
      }));
    });
    // combineLatest(this.referralService.getAll(), this.planService.getAll())
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(([allReferrals, allPlans]) => {
    //     if (allReferrals) {
    //       this.countActive = allReferrals.data;
    //     }
    //     if (allPlans) {
    //       this.planList = allPlans.map(item => ({
    //         value: item.name, planDetail: {
    //           percentage: item.profitPercent,
    //           month: item.duration
    //         }
    //       }))
    //     }
    //   })

    // this.referralService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe((response) => {
    //     this.countActive = response.data;
    //   });
    // this.planService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe((r: any) => {
    //     this.planList = r.map(item => ({
    //       value: item.name, planDetail: {
    //         percentage: item.profitPercent,
    //         month: item.duration,
    //         referralPercent: item.referralPercent,
    //         minimumDeposit: item.minimumDeposit
    //       }
    //     }));
    //   });

  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  // }

  get f() {
    return this.form.controls;
  }

  getActiveInviteesCount() {
    this.referralService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.activeInviteesCount = response.data;
      });
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
    const referralPercentage = this.toPercentage(this.plan.planDetail.referralPercent) * this.countActive;
    return parseFloat((investmentValue + (investmentValue * (profitPercentage + referralPercentage))).toFixed(8));
  }

  toPercentage(percentage: number) {
    return (percentage / 100);
  }
}
