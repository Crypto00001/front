import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstName:string;
  lastName:string;

  constructor(private router:Router, private accountService: AccountService) {
  }

  ngOnInit() {
    const user = this.accountService.userValue?.data;
    this.firstName=user.firstName;
    this.lastName=user.lastName;
  }

  logOut(){
    this.accountService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
