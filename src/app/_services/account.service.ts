import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<User>(
      this.cookieService.get('user')===''?null:JSON.parse(this.cookieService.get('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }
  getUserFromCookie() {
    return JSON.parse(this.cookieService.get('user'));
  }
  login(email, password) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.cookieService.set('user',JSON.stringify(user),{secure:true});
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.cookieService.delete('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(params) {
    return this.http.put<any>(`${environment.apiUrl}/user/`, params).pipe(
      map((x) => {
        // update local storage
        const user = { ...this.userValue, ...params };
        this.cookieService.set('user',JSON.stringify(user),{secure:true});

        // publish updated user to subscribers
        this.userSubject.next(user);
        return x;
      })
    );
  }
  updatePassword(params) {
    return this.http.put<any>(`${environment.apiUrl}/user/password`, params).pipe(
      map((x) => {
        // update local storage
        const user = { ...this.userValue, ...params };
        this.cookieService.set('user',JSON.stringify(user),{secure:true});

        // publish updated user to subscribers
        this.userSubject.next(user);
        return x;
      })
    );
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
