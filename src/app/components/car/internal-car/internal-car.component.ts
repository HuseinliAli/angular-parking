import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { ApiDataResponseModel } from '../../../models/common/apiDataResponse';
import { ListResponseModel } from '../../../models/common/listResponse';
import { InternalCarListModel } from '../../../models/cars/internalCarList';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-internal-car',
  templateUrl: './internal-car.component.html',
  styleUrl: './internal-car.component.css',
})
export class InternalCarComponent implements OnInit {
  cars: InternalCarListModel[];
  private carAddedSubscription: Subscription;
  constructor(private carService: CarService) {}
  ngOnInit(): void {
    this.getInternalCarsByUserId();
    this.carAddedSubscription = this.carService.carAdded$.subscribe(() => {
      this.getInternalCarsByUserId();
    });
  }
  ngOnDestroy(): void {
    this.carAddedSubscription.unsubscribe();
  }
  getInternalCarsByUserId() {
    this.carService
      .getInternalCarsByUserId(this.getUserId())
      .subscribe((data) => (this.cars = JSON.parse(data.d.toString())));
  }

  getUserId(): string {
    return localStorage.getItem('p-user-id')!;
  }
}
