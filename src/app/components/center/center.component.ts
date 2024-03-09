import { Component, OnInit } from '@angular/core';
import { CenterListResponse } from '../../models/centers/centerList';
import { CenterService } from '../../services/center.service';
import { InternalCarListModel } from '../../models/cars/internalCarList';
import { CarService } from '../../services/car.service';
import { OrderStartModel } from '../../models/orders/orderStart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ApiResponseModel } from '../../models/common/apiResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrl: './center.component.css',
})
export class CenterComponent implements OnInit {
  centers: CenterListResponse[];
  cars: InternalCarListModel[];
  startRequest: OrderStartModel;
  startResponse: ApiResponseModel;
  centerId: number;
  startForm: FormGroup;
  constructor(
    private centerService: CenterService,
    private carService: CarService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCenters();
    this.getCars();
    this.createStartOrderForm();
  }
  setCenterId(id: number) {
    this.centerId = id;
  }
  startOrder() {
    if (this.startForm.valid) {
      this.startRequest = Object.assign({}, this.startForm.value);
      this.startRequest.UserId = this.getUserId();
      this.startRequest.ParkingCenterId = this.centerId;
    }
    this.orderService.startOrder(this.startRequest).subscribe((data) => {
      this.startResponse = JSON.parse(data.d.toString());
      if (this.startResponse.Success) {
        this.toastr.success(this.startResponse.Message);
        this.getCenters();
      } else {
        this.toastr.error(this.startResponse.Message);
      }
    });
  }
  getCenters() {
    this.centerService
      .getCenters()
      .subscribe((data) => (this.centers = JSON.parse(data.d.toString())));
  }
  getCars() {
    this.carService
      .getInternalCarsByUserId(this.getUserId())
      .subscribe((data) => (this.cars = JSON.parse(data.d.toString())));
  }

  createStartOrderForm() {
    this.startForm = this.formBuilder.group({
      CarId: ['', [Validators.required]],
    });
  }

  getUserId(): string {
    return localStorage.getItem('p-user-id')!;
  }
}
