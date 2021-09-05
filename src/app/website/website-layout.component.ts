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
  loadAPI: Promise<any>;
  constructor(private route: ActivatedRoute,@Inject(DOCUMENT) private document: Document) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
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
  public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["../../assets/js/owl.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}
}
