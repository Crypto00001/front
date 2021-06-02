import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'site-layout-root',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  menuRoute = '';
  constructor(private route: ActivatedRoute) {
    this.menuRoute = route.snapshot.routeConfig.path;
  }

  ngOnInit() {}
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
  }
}
