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
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("vertical-layout");
    body.classList.add("dark-layout");
    body.classList.add("2-columns");
    body.classList.add("navbar-floating");
    body.classList.add("footer-static");
    body.classList.add("pace-done");
    body.classList.add("menu-expanded"); 
    body.classList.add("vertical-menu-modern");
    var att = document.createAttribute("data-menu");
    att.value = "vertical-menu-modern";
    body.attributes.setNamedItem(att);
  }

  ngOnInit() {

  }
}
