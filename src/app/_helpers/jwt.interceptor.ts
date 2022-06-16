import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services/account.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue?.data;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        else if(user === undefined && !request.url.endsWith('login')){
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
        return next.handle(request);
    }
}
