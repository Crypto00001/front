import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private router:Router, private accountService: AccountService) {}

  ngOnInit() {}

  onLogoutClick() {
    this.accountService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
