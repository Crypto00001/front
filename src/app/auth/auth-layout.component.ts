import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'auth-layout-root',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  menuRoute = '';
  constructor(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) {

    const cssURLs = [
      '../../../assets/css/vendors.min.css',
      '../../../assets/css/bootstrap.min.css',
      '../../../assets/css/bootstrap-extended.min.css',
      '../../../assets/css/colors.min.css',
      '../../../assets/css/components.min.css',
      '../../../assets/css/dark-layout.min.css',
      '../../../assets/css/bordered-layout.min.css',
      '../../../assets/css/semi-dark-layout.min.css',
      '../../../assets/css/vertical-menu.min.css',
      '../../../assets/css/form-validation.css',
      '../../../assets/css/page-auth.min.css',
    ];
    const head = this.document.getElementsByTagName('head')[0];
    cssURLs.forEach((element) => {
      const newLinkEl = this.document.createElement('link');
      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = element;
      head.appendChild(newLinkEl);
    });
  }

  ngOnInit() {
    // loading templates js after dom render
    $.getScript('../../assets/js/app/app-menu.min.js', function () {});
    $.getScript('../../assets/js/app/app.min.js', function () {});
    $.getScript('../../assets/js/app/jquery.validate.min.js', function () {});
    $.getScript('../../assets/js/app/page-auth-login.js', function () {});
    $.getScript('../../assets/js/app/vendors.min.js', function () {});
  }
}
