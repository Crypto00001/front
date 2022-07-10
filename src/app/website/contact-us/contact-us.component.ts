import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  generalForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  @ViewChild('sendNotif') sendNotif:ElementRef;
  ngOnInit(): void {
    this.generalForm = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      message: [null, Validators.required],
      subject: [null, Validators.required],
    });
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.generalForm.invalid) {
      return;
    }
    this.sendNotif.nativeElement.style.display='block';
    setTimeout(() => {
      this.sendNotif.nativeElement.style.display='none';
    }, 5000);
 }
}
