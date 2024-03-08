import { Component, OnInit } from '@angular/core';
import { ApiDataResponseModel } from '../../models/common/apiDataResponse';
import { BrandModel } from '../../models/cars/brandModel';
import { ModelModel } from '../../models/cars/modelModel';
import { BrandService } from '../../services/brand.service';
import { ModelService } from '../../services/model.service';
import { CarService } from '../../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternalCarModel } from '../../models/cars/internalCar';
import { ApiResponseModel } from '../../models/common/apiResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  brands: BrandModel[];
  selectedBrandId: number;
  models: ModelModel[];
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
        this.toastr.success(this.internalCarResponse.Message);
      });
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
