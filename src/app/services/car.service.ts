import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InternalCarModel } from '../models/cars/internalCar';
import { ResponseModel } from '../models/common/response';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44345/Services/CarWebService.asmx';
  private carAddedSource = new Subject<void>();

  carAdded$ = this.carAddedSource.asObservable();
  constructor(private client: HttpClient) {}

  addInternalCar(car: InternalCarModel): Observable<ResponseModel> {
    this.carAddedSource.next();
    return this.client.post<ResponseModel>(`${this.apiUrl}/InternalCarAdd`, {
      request: car,
    });
  }

  getInternalCarsByUserId(userId: string) {
    return this.client.post<ResponseModel>(
      `${this.apiUrl}/InternalCarsByUserId`,
      { request: userId }
    );
  }
}
