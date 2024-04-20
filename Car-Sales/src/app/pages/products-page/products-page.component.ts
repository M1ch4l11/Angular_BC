import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';
import { GlobalService } from 'src/app/store/global-store.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private globalStore: GlobalService<any>,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getSearchFilteredTable(
        'products',
        this.globalStore.getFilter('products', '')
      )
      .pipe(
        tap((json: any) => {
          this.globalStore.setListItems(json.rows);
        })
      )
      .subscribe(() => {});
    this.dataService
      .getFirstPagination('products')
      .pipe(
        tap((json: any) => {
          this.globalStore.setPagination(json.pagination);
        })
      )
      .subscribe(() => {});
  }
}
