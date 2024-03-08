import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { xml2js } from 'xml-js';
import { BrandModel } from '../models/cars/brandModel';
import { ResponseModel } from '../models/common/response';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl =
    'https://localhost:44345/Services/BrandWebService.asmx/Brands';

  constructor(private client: HttpClient) {}

  // getBrands(): Observable<ResponseModel<BrandModel[]>> {
  //   return this.client.post<ResponseModel<BrandModel[]>>(this.apiUrl, {});
  // }
}
