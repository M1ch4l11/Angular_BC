import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { SearchFilter } from '../models/table-type';
import { ItemType } from '../models/item-type';

@Injectable({
  providedIn: 'root',
})
export class GlobalService<T> {
  searchListItems: WritableSignal<T[]> = signal([]) as WritableSignal<T[]>;
  // user = signal([{ login: 'Michal', password: 'Lojko' }]);

  constructor() {}

  createSignal(listItems: WritableSignal<T[]>): void {
    this.searchListItems = listItems;
  }

  setListItems(item: T[]): void {
    this.searchListItems.set(item);
  }

  getFilter(type: ItemType, searchValue: string): SearchFilter {
    return type === 'products'
      ? {
          columnNameFirst: 'productcode',
          columnNameSecond: 'productname',
          firstCondition: 'contains',
          firstConditionValue: searchValue,
        }
      : {
          columnNameFirst: 'employeenumber',
          columnNameSecond: 'email',
          firstCondition: 'contains',
          firstConditionValue: searchValue,
        };
  }
}
