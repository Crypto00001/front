import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // loading templates js after dom render
    $.getScript('../../assets/js/popper.min.js', function () {});
    $.getScript('../../assets/js/bootstrap.min.js', function () {});
    $.getScript('../../assets/js/owl.js', function () {});
    $.getScript('../../assets/js/wow.js', function () {});
    $.getScript('../../assets/js/validation.js', function () {});
    $.getScript('../../assets/js/isotope.js', function () {});
    $.getScript('../../assets/js/appear.js', function () {});
    $.getScript('../../assets/js/jquery-ui.js', function () {});
    $.getScript('../../assets/js/jquery.fancybox.js', function () {});
    $.getScript('../../assets/js/SmoothScroll.js', function () {});
    $.getScript('../../assets/js/map-helper.js', function () {});
    $.getScript('../../assets/js/script.js', function () {});
    $.getScript('../../assets/js/plan_manager.js', function () {});
}
}
