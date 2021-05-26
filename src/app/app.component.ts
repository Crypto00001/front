import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {

  }



  ngOnInit() {
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
