import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.scss'],
})
export class LoginPagesComponent {}
