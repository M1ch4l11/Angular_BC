import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { FormInput, SendEvent } from 'src/app/models/form';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/store/global-store.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeFormService {
  constructor(
    private dataService: DataService,
    private globalService: GlobalService<any>
  ) {}

  send(options: any): void {
    if (!options.form.valid) {
      return;
    }
    if (options.btnTitle === 'Edit') {
      this.dataService
        .updateRecord(options.table.replace('Edit', ''), options.options)
        .pipe(
          tap(() => {
            this.globalService.setListItems(
              this.globalService.searchListItems().map((item) => {
                if (
                  item.email === options.options.email &&
                  item.email !== undefined
                ) {
                  item = options.options;
                }
                return item;
              })
            );
          }),
          catchError((error) => {
            alert('Doesnt Succesfull action');
            return '';
          })
        )
        .subscribe(() => {});
    } else {
      this.dataService
        .createRecord(options.table, options.options)
        .pipe(
          tap((response) => {
            if (response) {
              alert('Succesfull action');
            }
          }),
          catchError((error) => {
            alert('Doesnt Succesfull action');
            return '';
          })
        )
        .subscribe(() => {});
    }
  }
}
