import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  walletList: any;

  constructor( private formBuilder: FormBuilder,
    private alertService:AlertService,
    private walletService:WalletService) { 
  }

  ngOnInit() {
    this.walletService.getAllForDeposit().pipe(first())
    .subscribe((response) => {
      this.walletList = response.data;
    });
  }

}
