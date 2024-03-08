import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelModel } from '../models/cars/modelModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/common/response';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  models: ModelModel[];
  apiUrl =
    'https://localhost:44345/Services/ModelWebService.asmx/ModelsByBrandId';
  constructor(private client: HttpClient) {}

  // getModelsByBrandId(id: number): Observable<ResponseModel<ModelModel[]>> {
  //   return this.client.post<ResponseModel<ModelModel[]>>(this.apiUrl, {
  //     id: id,
  //   });
  // }
}
