import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  isLogged: boolean;
  fullName: string;
  loginSubscription: Subscription;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.updateNavbar();
    this.loginSubscription = this.userService.loginSubject.subscribe(() => {
      this.updateNavbar();
    });
  }
  updateNavbar(): void {
    if (this.userService.isLogged()) {
      this.isLogged = true;
      this.fullName = localStorage.getItem('p-user-fullname')!;
    } else {
      this.isLogged = false;
    }
  }

  logOut(): void {
    this.userService.logout();
  }
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
