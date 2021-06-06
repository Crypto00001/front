import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'site-layout-root',
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  menuRoute = '';
  constructor(private route: ActivatedRoute,@Inject(DOCUMENT) private document: Document) {
    this.menuRoute = route.snapshot.routeConfig.path;
      const cssURLs = [
        '../../../assets/css/style.css',
        '../../../assets/css/responsive.css',
      ];
      const head = this.document.getElementsByTagName('head')[0];
      cssURLs.forEach((element) => {
        const newLinkEl = this.document.createElement('link');
        newLinkEl.rel = 'stylesheet';
        newLinkEl.href = element;
        head.appendChild(newLinkEl);
      });
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
