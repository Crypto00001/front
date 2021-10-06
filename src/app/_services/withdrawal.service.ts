import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Withdrawal } from '../_models/withdrawal';

@Injectable({ providedIn: 'root' })
export class WithdrawalService {
  constructor(private http: HttpClient) {}

  registerWithdrawal(withdrawal: Withdrawal) {
    return this.http.post<any>(`${environment.apiUrl}/withdrawal`, withdrawal);
  }
}
