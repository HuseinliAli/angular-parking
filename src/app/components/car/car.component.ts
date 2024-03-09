import { Component, OnInit } from '@angular/core';
import { ApiDataResponseModel } from '../../models/common/apiDataResponse';
import { BrandModel } from '../../models/cars/brand';
import { ModelModel } from '../../models/cars/model';
import { BrandService } from '../../services/brand.service';
import { ModelService } from '../../services/model.service';
import { CarService } from '../../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternalCarModel } from '../../models/cars/internalCar';
import { ApiResponseModel } from '../../models/common/apiResponse';
import { ToastrService } from 'ngx-toastr';
import { InternalCarListModel } from '../../models/cars/internalCarList';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  brands: BrandModel[];
  selectedBrandId: number;
  models: ModelModel[];
  cars: InternalCarListModel[];
  internalCarForm: FormGroup;
  internalCarRequest: InternalCarModel;
  internalCarResponse: ApiResponseModel;
  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getBrands();
    this.createAddInternalCarForm();
    this.getInternalCarsByUserId();
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((data) => (this.brands = JSON.parse(data.d.toString())));
  }

  getModels() {
    this.modelService
      .getModelsByBrandId(this.selectedBrandId)
      .subscribe((data) => (this.models = JSON.parse(data.d.toString())));
  }

  addInternalCar() {
    if (this.internalCarForm.valid) {
      this.internalCarRequest = Object.assign({}, this.internalCarForm.value);
      this.internalCarRequest.UserId = this.getUserId();
    }

    this.carService
      .addInternalCar(this.internalCarRequest)
      .subscribe((data) => {
        this.internalCarResponse = JSON.parse(data.d.toString());
        if (this.internalCarResponse.Success) {
          this.toastr.success(this.internalCarResponse.Message);
        } else {
          this.toastr.error(this.internalCarResponse.Message);
        }

        this.getInternalCarsByUserId();
      });
  }
  getInternalCarsByUserId() {
    this.carService
      .getInternalCarsByUserId(this.getUserId())
      .subscribe((data) => (this.cars = JSON.parse(data.d.toString())));
  }
  createAddInternalCarForm() {
    this.internalCarForm = this.formBuilder.group({
      ModelId: ['', Validators.required],
      CarNumber: ['', Validators.required],
      TechNumber: ['', Validators.required],
    });
  }

  getUserId(): string {
    return localStorage.getItem('p-user-id')!;
  }
}
