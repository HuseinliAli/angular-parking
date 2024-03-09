import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/common/response';
import { CenterListResponse } from '../models/centers/centerList';
import { ListResponseModel } from '../models/common/listResponse';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  apiUrl = 'https://localhost:44345/Services/ParkingCenterWebService.asmx';
  constructor(private client: HttpClient) {}

  getCenters(): Observable<ListResponseModel<CenterListResponse>> {
    return this.client.post<ListResponseModel<CenterListResponse>>(
      `${this.apiUrl}/ParkingCenters`,
      {}
    );
  }
}
