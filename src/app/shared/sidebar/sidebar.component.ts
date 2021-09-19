import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  onLogoutClick() {
    this.accountService.logout();
  }
}
