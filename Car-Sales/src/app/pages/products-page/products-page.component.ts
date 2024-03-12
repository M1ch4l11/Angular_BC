import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/stores/data.service';
import { tap } from 'rxjs';
import { GlobalService } from 'src/app/stores/global-store.service';

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
      .getAll('products')
      .pipe(
        tap((values) => {
          this.globalStore.setListItems(values);
          console.log(this.globalStore.searchListItems());
        })
      )
      .subscribe(() => {});
  }
}
