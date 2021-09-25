import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { UserPlanService } from 'src/app/_services/user-plan.service';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  walletData: any;
  planList: Array<any>  = [
    'Bronze',
    'Silver',
    'Gold'
  ];
  cryptoList: Array<any>  = [
    {key:1,value:'Bitcoin'},
    {key:2,value:'Etherium'},
    {key:3,value:'Litecoin'},
    {key:4,value:'Zcash'},
  ];
  constructor( private formBuilder: FormBuilder,
    private router: Router, 
    private alertService:AlertService,
    private userPlanService:UserPlanService,
    private walletService:WalletService) { 
  }
  popup = false
  defaultPlan:string = null;
  balance:string=null;
  form: FormGroup;
  loading = false;
  submitted = false;
  ngOnInit() {
    this.form = this.formBuilder.group({
      planName: ['', Validators.required],
      walletType: [1, Validators.required],
      investmentAmount: ['', Validators.required]
  });
  
  }
  get f() { return this.form.controls; }
  invest(plan:string){
    this.form.controls.planName.setValue(plan);
    this.form.controls.investmentAmount.setValue('');
    this.walletService
    .getAll()
    .pipe(first())
    .subscribe((response) => {
      this.walletData = response.data;
    });
    this.balance = this.walletData.filter(q=>q.walletType==1)[0].availableBalance
    this.popup=true;
  }
  cryptoChange(item:number){
    this.balance = this.walletData.filter(q=>q.walletType==item)[0].availableBalance
  }
  onSubmit(){
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
            data => {
                this.alertService.success('Investment plan started successfully!', { keepAfterRouteChange: true });
                this.popup = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}
