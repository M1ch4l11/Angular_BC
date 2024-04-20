import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalService } from '../store/global-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private dataStore: GlobalService<any>, private router: Router) {}

  canActivate(): boolean {
    let auth = this.dataStore.userLogin();
    if (!auth) this.router.navigate(['/']);
    return auth;
  }
}
