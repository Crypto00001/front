import { DOCUMENT } from "@angular/common";
import { Renderer2 } from "@angular/core";
import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";

@Component({
  selector: "app-launcher",
  templateUrl: "./portal-layout.component.html",
  styleUrls: ["./portal-layout.component.scss"],
})
export class PortalLayoutComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    const cssURLs = [
      "../../../assets/vendors/css/vendors.min.css",
      "../../../assets/vendors/css/charts/apexcharts.css",
      "../../../assets/vendors/css/extensions/tether.min.css",
      "../../../assets/css/bootstrap.css",
      "../../../assets/css/bootstrap-extended.css",
      "../../../assets/css/colors.css",
      "../../../assets/css/components.css",
      "../../../assets/css/themes/dark-layout.css",
      "../../../assets/css/core/menu/menu-types/vertical-menu.css",
    ];
    const head = this.document.getElementsByTagName("head")[0];
    cssURLs.forEach((element) => {
      const newLinkEl = this.document.createElement("link");
      newLinkEl.rel = "stylesheet";
      newLinkEl.href = element;
      head.appendChild(newLinkEl);
    });
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("vertical-layout");
    body.classList.add("dark-layout");
    body.classList.add("2-columns");
    body.classList.add("navbar-floating");
    body.classList.add("footer-static");
    body.classList.add("pace-done");
    body.classList.add("menu-expanded"); 
    body.classList.add("vertical-menu-modern");
  }

  ngOnInit() {

  }
}
