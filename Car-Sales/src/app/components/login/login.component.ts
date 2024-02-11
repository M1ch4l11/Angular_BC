import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { GlobalService } from 'src/app/stores/global.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profileForm!: FormGroup;
  // firstSignal!: Signal<{ login: String; password: String }[]>;

  constructor() {} // private storeService: GlobalService<{ login: String; password: String }>

  ngOnInit(): void {
    this.createProfileForm();
    // this.firstSignal = computed(() => this.storeService.searchListItems());
  }

  userLogin(): void {
    // check user login in database
    // save to globalStore as signal & open products

    console.log(this.profileForm.getRawValue());
    // const newValues = this.profileForm.getRawValue();
    // this.storeService.updateSearchListItem(newValues);
    // this.storeService.createSignal(newValues);
    // this.firstSignal = computed(() => this.storeService.searchListItems());
  }

  createProfileForm(): void {
    this.profileForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
