import { Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ItemType } from 'src/app/models/item-type';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/store/global-store.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeListService {
  subscribtion: Subscription[] = [];

  constructor(
    private dataService: DataService,
    private globalStore: GlobalService<any>
  ) {}

  deleteItemEvent(event: any, type: ItemType): void {
    this.deleteRecord(event, type);
    this.getfirstPagination(type);
    this.getSearchFilteredTable(type);
  }

  deleteRecord(event: any, type: ItemType): void {
    this.subscribtion.push(
      this.dataService
        .deleteRecord(
          type,
          type === 'products' ? event.productcode : event.employeenumber
        )
        .pipe(tap((response) => console.log(response)))
        .subscribe(() => {})
    );
  }

  getfirstPagination(type: ItemType): void {
    this.subscribtion.push(
      this.dataService
        .getFirstPagination(type)
        .pipe(
          tap((json: any) => {
            this.globalStore.setPagination(json.pagination);
          })
        )
        .subscribe(() => {})
    );
  }

  getSearchFilteredTable(type: ItemType): void {
    this.subscribtion.push(
      this.dataService
        .getSearchFilteredTable(type, this.globalStore.getFilter(type, ''))
        .pipe(
          tap((json: any) => {
            this.globalStore.setListItems(json.rows);
          })
        )
        .subscribe(() => {})
    );
  }

  destroyEvent(): void {
    this.subscribtion.forEach((subscribe) => subscribe.unsubscribe());
  }
}
