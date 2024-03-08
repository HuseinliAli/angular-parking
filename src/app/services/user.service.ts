import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserResponseModel } from '../models/user/userResponse';
import { ResponseModel } from '../models/common/response';
import { RegisterRequestModel } from '../models/user/registerRequest';
import { LoginRequestModel } from '../models/user/loginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44345/Services/AccountWebService.asmx/';
  loggedIn = false;
  loginSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private client: HttpClient, private route: Router) {}

  registerUser(register: RegisterRequestModel): Observable<ResponseModel> {
    return this.client.post<ResponseModel>(`${this.apiUrl}Register`, {
      request: register,
    });
  }

  loginUser(login: LoginRequestModel): Observable<ResponseModel> {
    return this.client.post<ResponseModel>(`${this.apiUrl}Login`, {
      request: login,
    });
  }
  isLogged() {
    if (localStorage.getItem('p-logged-in') == 'true') return true;
    return false;
  }
  logout() {
    localStorage.removeItem('p-user-fullname');
    localStorage.removeItem('p-user-email');
    localStorage.removeItem('p-user-id');
    localStorage.removeItem('p-logged-in');
    this.loginSubject.next(false);
    this.route.navigate(['login']);
  }
}
