import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Plan} from '../_models/plan';


@Injectable({providedIn: 'root'})
export class PlanService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/plan`);
  }
}
