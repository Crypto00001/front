import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  viewChi;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private walletService: WalletService
  ) {}
  currentStep = 1;
  previousButton = 'none';
  nextButton = 'block';
  popup = true;

  stepOne = 'block';
  stepTwo = 'none';
  stepThree = 'none';

  @ViewChild('paymentLi') paymentLi: ElementRef;
  @ViewChild('transactionIdentificationLi') transactionIdentificationLi: ElementRef;
  @ViewChild('confirmationLi') confirmationLi: ElementRef;

  @ViewChild('paymentFi') paymentFi: ElementRef;
  @ViewChild('transactionIdentificationFi') transactionIdentificationFi: ElementRef;
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
        this.previousButton='none';
        this.stepOne='block';
        this.stepTwo='none';
        break;
      case 3:
        this.transactionIdentificationLi.nativeElement.className = 'current';
        this.confirmationLi.nativeElement.className = 'disabled';
        this.nextButton='block';
        this.stepTwo='block';
        this.stepThree='none';
        break;
    }
    --this.currentStep;
  }
  next() {
    switch (this.currentStep) {
      case 1:
        this.paymentLi.nativeElement.className = 'first done';
        this.transactionIdentificationLi.nativeElement.className = 'current';
        this.previousButton='block';
        this.stepOne='none';
        this.stepTwo='block';
        break;
      case 2:
        this.transactionIdentificationLi.nativeElement.className = 'done';
        this.confirmationLi.nativeElement.className = 'last current';
        this.nextButton='none';
        this.stepTwo='none';
        this.stepThree='block';
        break;
    }
    ++this.currentStep;
  }
  closePopup(){
    this.popup=false;
  }
}
