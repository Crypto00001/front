import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Plan} from '../_models/plan';
import {CookieService} from 'ngx-cookie-service';


@Injectable({providedIn: 'root'})
export class PlanService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<Plan[]>(`${environment.apiUrl}/plan`);
  }
}
