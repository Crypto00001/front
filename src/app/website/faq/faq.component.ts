import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit(): void {
    const div = this.elRef.nativeElement.querySelector('.accordion.block.active-block');
    const first = div.querySelector('div:nth-child(1)');
    const last = div.querySelector('div:nth-child(2)');
    div.classList.remove('active-block');
    first.classList.remove('active');
    last.classList.remove('current');
  }
}
