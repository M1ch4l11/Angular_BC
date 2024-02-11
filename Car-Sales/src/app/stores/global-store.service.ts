import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService<T> {
  searchListItems!: WritableSignal<T[]>;
  // searchListItems = signal([{ login: 'Michal', password: 'Lojko' }]);

  constructor() {}

  createSignal(listItems: WritableSignal<T[]>): void {
    this.searchListItems = listItems;
  }

  updateSearchListItem(item: T): void {
    this.searchListItems.update((field) => {
      field.push(item);
      return field;
    });
  }
}
