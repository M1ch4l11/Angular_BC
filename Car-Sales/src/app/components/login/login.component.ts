import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription, tap } from 'rxjs';
import { GlobalService } from 'src/app/store/global-store.service';
import { Router } from '@angular/router';
import { Filter, SearchFilter } from 'src/app/models/table-type';
import { FacadeLoginService } from './facade-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  login = computed(() => this.globalService.userLogin());

  constructor(
    private globalService: GlobalService<any>,
    private facadeLogin: FacadeLoginService
  ) {}

  ngOnInit(): void {
    this.createProfileForm();
  }

  authEvent(): void {
    if (this.login()) {
      this.globalService.setUserLogin(false);
      this.globalService.setAdminLogin(false);
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('Admin');
    }
    const formValues = this.profileForm.getRawValue();
    if (!this.profileForm.valid || !parseInt(formValues.password)) {
      return;
    }
    this.facadeLogin.authEvent(this.facadeLogin.createUserFilter(formValues));
  }

  createProfileForm(): void {
    this.profileForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.facadeLogin.destroy();
  }
}
