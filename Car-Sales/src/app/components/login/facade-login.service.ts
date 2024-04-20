import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/store/global-store.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeLoginService {
  subscribtions: Subscription[] = [];

  constructor(
    private dataService: DataService,
    private globalStore: GlobalService<any>,
    private router: Router
  ) {}

  authEvent(userFilter: any): void {
    this.subscribtions.push(
      this.dataService
        .authUser(userFilter)
        .pipe(
          tap((response) => {
            if (response) {
              this.globalStore.setUserLogin(true);
              sessionStorage.setItem('login', 'true');
              if (response[0].jobtitle === 'Admin') {
                this.globalStore.setAdminLogin(true);
                sessionStorage.setItem('Admin', 'true');
                console.log(
                  response[0].jobtitle,
                  '...',
                  this.globalStore.adminLogin()
                );
              }
              this.router.navigate(['/tables']);
            }
          })
        )
        .subscribe(() => {})
    );
  }

  createUserFilter(formValues: any): any {
    return {
      columnNameFirst: 'email',
      columnNameSecond: 'employeenumber',
      firstCondition: 'equals',
      firstConditionValue: formValues.email,
      secondCondition: 'equals',
      secondConditionValue: formValues.password,
    };
  }

  destroy(): void {
    this.subscribtions.forEach((subscribtion) => subscribtion.unsubscribe());
  }
}
