import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/store/global-store.service';
import { tap } from 'rxjs';
import { ItemType } from 'src/app/models/item-type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() type!: ItemType;
  timeout: any;

  constructor(
    private dataService: DataService,
    private globalStore: GlobalService<any>
  ) {}

  onInputEvent(event: Event): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchEvent((event.target as HTMLInputElement).value);
    }, 500);
  }

  searchEvent(searchValue: string): void {
    if (!searchValue) {
      this.dataService
        .getFirstPagination('products')
        .pipe(
          tap((json: any) => {
            this.globalStore.setPagination(json.pagination);
          })
        )
        .subscribe(() => {});
    }
    this.globalStore.setSearchFilterWord(searchValue);
    this.dataService
      .getSearchFilteredTable(
        this.type,
        this.globalStore.getFilter(this.type, searchValue)
      )
      .pipe(
        tap((json: any) => {
          this.globalStore.setListItems(json.rows);
          if (searchValue) {
            this.globalStore.setPagination(json.pagination);
          }
        })
      )
      .subscribe(() => {});
  }
}
