import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { BrandModel } from '../../models/cars/brandModel';
import { ModelModel } from '../../models/cars/modelModel';
import { ModelService } from '../../services/model.service';
import { UserService } from '../../services/user.service';
import { RegisterRequestModel } from '../../models/user/registerRequest';
import { Gender } from '../../models/user/gender';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDataResponseModel } from '../../models/common/apiDataResponse';
import { UserResponseModel } from '../../models/user/userResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  response: ApiDataResponseModel<UserResponseModel>;
  request: RegisterRequestModel;
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }
  registerUser() {
    if (this.registerForm.valid) {
      this.request = Object.assign({}, this.registerForm.value);
    }

    this.userService.registerUser(this.request).subscribe((data) => {
      this.response = JSON.parse(data.d.toString());
      this.router.navigate(['login']);
    });
  }
}
