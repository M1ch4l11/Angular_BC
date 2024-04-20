import { CommonModule } from '@angular/common';
import { Component, Input, Signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import { ItemType } from 'src/app/models/item-type';
import { Pagination, PaginationRequest } from 'src/app/models/table-type';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/store/global-store.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() tableName!: ItemType;
  pagination: Signal<Pagination> = computed(() =>
    this.globalStore.pagination()
  );
  constructor(
    private globalStore: GlobalService<any>,
    private dataService: DataService
  ) {}
  nextPage() {
    this.globalStore.pagination.update((pagination) => {
      let totalPage = pagination.totalPage;
      pagination.currentPage =
        pagination.currentPage === totalPage
          ? totalPage
          : pagination.currentPage + 1;
      return pagination;
    });
    let paginationRequest: PaginationRequest = {
      searchFilter: this.globalStore.getFilter(
        this.tableName,
        this.globalStore.searchWord()
      ),
      paginationFilter: this.globalStore.pagination(),
    };
    this.dataService
      .getFilteredTablePaginationEvent(this.tableName, paginationRequest)
      .pipe(
        tap((response) => {
          console.log(response);

          this.globalStore.setListItems(response);
        })
      )
      .subscribe(() => {});
  }

  previousPage() {
    this.globalStore.pagination.update((pagination) => {
      let currentPage = pagination.currentPage;
      pagination.currentPage =
        currentPage === 1 ? currentPage : pagination.currentPage - 1;
      return pagination;
    });
    let paginationRequest: PaginationRequest = {
      searchFilter: this.globalStore.getFilter(
        this.tableName,
        this.globalStore.searchWord()
      ),
      paginationFilter: this.globalStore.pagination(),
    };
    this.dataService
      .getFilteredTablePaginationEvent(this.tableName, paginationRequest)
      .pipe(
        tap((response) => {
          this.globalStore.setListItems(response);
        })
      )
      .subscribe(() => {});
  }
}
