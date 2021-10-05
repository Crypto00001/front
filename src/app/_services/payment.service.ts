import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Payment } from '../_models/payment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  registerPayment(payment: Payment) {
    return this.http.post<any>(`${environment.apiUrl}/payment`, payment);
  }
}
