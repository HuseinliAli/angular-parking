import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../models/cars/brand';
import { ListResponseModel } from '../models/common/listResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl =
    'https://localhost:44345/Services/BrandWebService.asmx/Brands';

  constructor(private client: HttpClient) {}

  getBrands(): Observable<ListResponseModel<BrandModel>> {
    return this.client.post<ListResponseModel<BrandModel>>(this.apiUrl, {});
  }
}
