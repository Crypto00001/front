import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Payment } from 'src/app/_models/payment';
import { AlertService } from 'src/app/_services/alert.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  walletList: any;
  viewChi;
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private walletService: WalletService,
    private paymentService: PaymentService
  ) {}
  currentStep = 1;
  previousButton = 'none';
  nextButton = 'block';
  popup: boolean;

  stepOne = 'block';
  stepTwo = 'none';
  stepThree = 'none';

  cryptoList: Array<any> = [
    { key: 1, value: 'Bitcoin' },
    { key: 2, value: 'Etherium' },
    { key: 3, value: 'Litecoin' },
    { key: 4, value: 'Zcash' },
  ];

  submitted = false;
  paymentNumber: number;
  amount = new FormControl('', Validators.required);
  transactionId = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  walletType = new FormControl('', Validators.required);

  @ViewChild('paymentLi') paymentLi: ElementRef;
  @ViewChild('transactionIdentificationLi')
  transactionIdentificationLi: ElementRef;
  @ViewChild('confirmationLi') confirmationLi: ElementRef;

  @ViewChild('paymentFi') paymentFi: ElementRef;
  @ViewChild('transactionIdentificationFi')
  transactionIdentificationFi: ElementRef;
  @ViewChild('confirmationFi') confirmationFi: ElementRef;

  ngOnInit() {
    this.walletService
      .getAllForDeposit()
      .pipe(first())
      .subscribe((response) => {
        this.walletList = response.data;
      });
  }
  previous() {
    switch (this.currentStep) {
      case 2:
        this.paymentLi.nativeElement.className = 'first current';
        this.transactionIdentificationLi.nativeElement.className = 'disabled';
        this.previousButton = 'none';
        this.stepOne = 'block';
        this.stepTwo = 'none';
        break;
      case 3:
        this.transactionIdentificationLi.nativeElement.className = 'current';
        this.confirmationLi.nativeElement.className = 'disabled';
        this.nextButton = 'block';
        this.stepTwo = 'block';
        this.stepThree = 'none';
        break;
    }
    --this.currentStep;
  }
  next() {
    switch (this.currentStep) {
      case 1:
        this.submitted = true;
        if (this.amount.invalid) return;
        this.paymentLi.nativeElement.className = 'first done';
        this.transactionIdentificationLi.nativeElement.className = 'current';
        this.previousButton = 'block';
        this.stepOne = 'none';
        this.stepTwo = 'block';
        this.submitted = false;
        ++this.currentStep;
        break;
      case 2:
        this.submitted = true;
        if (this.transactionId.invalid) return;

        const payment: Payment = {
          amount: this.amount.value,
          transactionId: this.transactionId.value,
          walletType: this.walletType.value,
        };
        this.paymentService
          .registerPayment(payment)
          .pipe(first())
          .subscribe((response) => {
            if (response.hasError) {
              this.alertService.error(response.errorMessage);
              this.loading = false;
            } else {
              this.transactionIdentificationLi.nativeElement.className = 'done';
              this.confirmationLi.nativeElement.className = 'last current';
              this.nextButton = 'none';
              this.stepTwo = 'none';
              this.stepThree = 'block';
              this.submitted = false;
              this.previousButton = 'none';
              this.currentStep=1;
              this.paymentNumber = response.data.paymentNumber;
            }
          });
        break;
    }
  }
  charge(walletType: number) {
    this.walletType.setValue(walletType);
    this.popup = true;
  }
  closePopup() {
    this.popup = false;
  }
}
