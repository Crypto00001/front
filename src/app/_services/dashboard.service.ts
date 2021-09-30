import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';


@Injectable({ providedIn: 'root' })
export class DashboardService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/dashboard`);
    }
}