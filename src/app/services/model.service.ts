import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelModel } from '../models/cars/model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/common/response';
import { ListResponseModel } from '../models/common/listResponse';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  models: ModelModel[];
  apiUrl =
    'https://localhost:44345/Services/ModelWebService.asmx/ModelsByBrandId';
  constructor(private client: HttpClient) {}

  getModelsByBrandId(id: number): Observable<ListResponseModel<ModelModel>> {
    return this.client.post<ListResponseModel<ModelModel>>(this.apiUrl, {
      id: id,
    });
  }
}
