import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponseModel } from '../models/user/registerResponse';
import { ResponseModel } from '../models/common/response';
import { RegisterRequestModel } from '../models/user/registerRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44345/Services/AccountWebService.asmx/Register';
  constructor(private client: HttpClient) {}

  registerUser(register: RegisterRequestModel): Observable<ResponseModel> {
    return this.client.post<ResponseModel>(this.apiUrl, {
      request: register,
    });
  }
}
