import { Injectable, WritableSignal, signal } from '@angular/core';
import { Pagination, SearchFilter } from '../models/table-type';
import { ItemType } from '../models/item-type';

@Injectable({
  providedIn: 'root',
})
export class GlobalService<T> {
  searchListItems: WritableSignal<T[]> = signal([]) as WritableSignal<T[]>;
  userLogin = signal(!!sessionStorage.getItem('login') || false);
  adminLogin = signal(!!sessionStorage.getItem('Admin') || false);
  pagination: WritableSignal<Pagination> = signal(
    {}
  ) as WritableSignal<Pagination>;

  searchWord: WritableSignal<string> = signal('') as WritableSignal<string>;

  constructor() {}

  createSignal(listItems: WritableSignal<T[]>): void {
    this.searchListItems = listItems;
  }

  setSearchFilterWord(searchWord: string): void {
    this.searchWord.set(searchWord);
  }

  setUserLogin(login: boolean): void {
    this.userLogin.set(login);
  }

  setAdminLogin(admin: boolean): void {
    this.adminLogin.set(admin);
  }

  setPagination(pagination: Pagination): void {
    this.pagination.set(pagination);
  }

  setListItems(items: T[]): void {
    this.searchListItems.set(items);
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

  createPagination(rows: any): Pagination {
    return {
      currentPage: 1,
      totalPage: Math.ceil(rows.length / 10),
      rows: rows.length,
    };
  }
}
