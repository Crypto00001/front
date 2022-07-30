import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { CookieService } from 'ngx-cookie-service';
import { ResetPassword } from '../_models/ResetPassword';
import { ResetPasswordRequest } from '../_models/resetPasswordRequest';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
          this.cookieService.set('user',JSON.stringify(user),{secure:false});
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    //this.userValue.data = null;
    this.cookieService.delete('user');
    this.userSubject.next(null);
  }

  register(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/user/register`, user);
  }

  getCurrentUser() {
    return this.http.get<any>(`${environment.apiUrl}/user/`);
  }

  update(params) {
    return this.http.put<any>(`${environment.apiUrl}/user/`, params).pipe(
      map((x) => {
        // update local storage
        const user = { ...this.userValue, ...params };
        this.cookieService.set('user',JSON.stringify(user),{secure:false});

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
        this.cookieService.set('user',JSON.stringify(user),{secure:false});

        // publish updated user to subscribers
        this.userSubject.next(user);
        return x;
      })
    );
  }

  resetPasswordRequest(resetPasswordRequest: ResetPasswordRequest) {
    return this.http.post<any>(`${environment.apiUrl}/user/resetPasswordRequest`, resetPasswordRequest);
  }

  doResetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(`${environment.apiUrl}/user/doResetPassword`, resetPassword);
  }

}
