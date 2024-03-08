import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { BrandModel } from '../../models/cars/brandModel';
import { ModelModel } from '../../models/cars/modelModel';
import { ModelService } from '../../services/model.service';
import { UserService } from '../../services/register.service';
import { RegisterRequestModel } from '../../models/user/registerRequest';
import { RegisterResponseModel } from '../../models/user/registerResponse';
import { Gender } from '../../models/user/gender';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDataResponseModel } from '../../models/common/apiDataResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  response: ApiDataResponseModel<RegisterResponseModel>;
  request: RegisterRequestModel;
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
      console.log(this.response.Message);
    });
  }
  // getBrands() {
  //   this.brandService.getBrands().subscribe((data) => {
  //     this.brands = JSON.parse(data.d.toString());
  //   });
  // }

  // getModelsByBrandId(id: number) {
  //   this.modelService.getModelsByBrandId(id).subscribe((data) => {
  //     this.models = JSON.parse(data.d.toString());
  //   });
  // }
}
