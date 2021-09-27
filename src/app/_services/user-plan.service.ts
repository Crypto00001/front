import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserPlan } from '../_models/user-plan';

@Injectable({ providedIn: 'root' })
export class UserPlanService {
  constructor(private http: HttpClient) {}

  registerPlan(userPlan: UserPlan) {
    return this.http.post<any>(`${environment.apiUrl}/userPlan`, userPlan);
  }
  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/userPlan`);
  }
}
