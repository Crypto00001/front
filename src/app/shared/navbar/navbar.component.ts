import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstName:string;
  lastName:string;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    const user = this.accountService.userValue?.data;
    this.firstName=user.firstName;
    this.lastName=user.lastName;
  }


}
