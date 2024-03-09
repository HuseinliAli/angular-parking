import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiDataResponseModel } from '../../models/common/apiDataResponse';
import { UserResponseModel } from '../../models/user/userResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginRequestModel } from '../../models/user/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  response: ApiDataResponseModel<UserResponseModel>;
  request: LoginRequestModel;
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.request = Object.assign({}, this.loginForm.value);
    }
    this.userService.loginUser(this.request).subscribe((data) => {
      this.response = JSON.parse(data.d.toString());
      console.log(this.response.Data);
      if (this.response.Success) {
        this.userService.loggedIn = true;
        localStorage.setItem('p-user-fullname', this.response.Data.FullName);
        localStorage.setItem('p-user-email', this.response.Data.EmailAddress);
        localStorage.setItem('p-user-id', this.response.Data.Id);
        localStorage.setItem('p-logged-in', this.response.Success.toString());
        this.userService.loginSubject.next(true);
        this.router.navigate(['dashboard/centers']);
      }
    });
  }
}
