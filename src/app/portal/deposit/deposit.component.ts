import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Payment } from 'src/app/_models/payment';
import { Withdrawal } from 'src/app/_models/withdrawal';
import { AlertService } from 'src/app/_services/alert.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { WalletService } from 'src/app/_services/wallet.service';
import { WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  walletList: any;
  viewChi;
  loading: boolean;
  displayWalletAddress: any;
  pathQR: string;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private walletService: WalletService,
    private paymentService: PaymentService,
    private withdrawalService: WithdrawalService
  ) {}
  currentStep = 1;
  previousButton = 'none';
  nextButton = 'block';
  popupDeposit: boolean;
  popupWithdraw: boolean;
  imgPath = '../../../assets/images/';
  stepOne = 'block';
  stepTwo = 'none';
  stepThree = 'none';

  stepOneWithdraw = 'block';
  stepTwoWithdraw = 'none';

  cryptoList: Array<any> = [
    { key: 1, value: 'Bitcoin' },
    { key: 2, value: 'Etherium' },
    { key: 3, value: 'Litecoin' },
    { key: 4, value: 'Zcash' },
  ];

  submitted = false;
  paymentNumber: number;
  withdrawalNumber: number;
  amount = new FormControl('', Validators.required);
  transactionId = new FormControl('', [
    Validators.required,
    Validators.minLength(32),
    Validators.maxLength(64),
  ]);
  walletType = new FormControl('', Validators.required);
  walletAddress = new FormControl('', [
    Validators.required,
    Validators.minLength(26),
    Validators.maxLength(120),
  ]);
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
        if (this.transactionId.invalid) {
          return;
        }

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
              this.closePopupDeposit();
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
              this.currentStep = 1;
              this.paymentNumber = response.data.paymentNumber;
            }
          });
        break;
    }
  }
  depositPopup(walletType: number) {
    this.popupDeposit = true;
    this.walletType.setValue(walletType);
    this.displayWalletAddress = this.walletList.find(
      (q) => q.walletType === walletType
    ).walletAddress;
    this.pathQR =
      this.imgPath +
      this.walletList.find((q) => q.walletType === walletType).name +
      '.JPG';
    this.clearControls();
  }

  withdrawPopup(walletType: number) {
    this.popupWithdraw = true;
    this.walletType.setValue(walletType);
    this.clearControls();
  }
  withdraw() {
    this.submitted = true;
    if (this.walletAddress.invalid) {
      return;
    }

    const withdrawal: Withdrawal = {
      amount: this.amount.value,
      walletAddress: this.walletAddress.value,
      walletType: this.walletType.value,
    };
    this.withdrawalService
      .registerWithdrawal(withdrawal)
      .pipe(first())
      .subscribe((response) => {
        if (response.hasError) {
          this.closePopupWithdraw();
          this.alertService.error(response.errorMessage);
          this.loading = false;
        } else {
          this.paymentLi.nativeElement.className = 'first done';
          this.confirmationLi.nativeElement.className = 'last current';
          this.stepOneWithdraw = 'none';
          this.stepTwoWithdraw = 'block';
          this.nextButton = 'none';
          this.submitted = false;
          this.withdrawalNumber = response.data.withdrawalNumber;
        }
      });
  }
  closePopupDeposit() {
    this.stepOne = 'block';
    this.stepTwo = 'none';
    this.stepThree = 'none';
    this.nextButton = 'block';
    this.popupDeposit = false;
  }
  closePopupWithdraw() {
    this.stepOneWithdraw = 'block';
    this.stepTwoWithdraw = 'none';
    this.nextButton = 'block';
    this.popupWithdraw = false;
  }

  clearControls() {
    this.amount.setValue(null);
    this.transactionId.setValue(null);
    this.walletAddress.setValue(null);
  }

  changeWalletType(event:any) {
    const walletText=event.target.options[event.target.options.selectedIndex].text;
    this.displayWalletAddress = this.walletList.find((q) => q.name === walletText).walletAddress;
    this.pathQR =this.imgPath +this.walletList.find((q) => q.name === walletText).name + '.JPG';
  }
}
