import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { CarComponent } from './components/car/car.component';
import { CenterComponent } from './components/center/center.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard/cars',
    component: CarComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard/centers',
    component: CenterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard/history',
    component: HistoryComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
