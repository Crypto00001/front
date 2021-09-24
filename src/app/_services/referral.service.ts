import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Referral } from "../_models/referral";

@Injectable({ providedIn: "root" })
export class ReferralService {
  constructor(private http: HttpClient) {}

  sendInvitation(referral: Referral) {
    return this.http.post<any>(`${environment.apiUrl}/referral`, referral);
  }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/referral`);
  }
}
