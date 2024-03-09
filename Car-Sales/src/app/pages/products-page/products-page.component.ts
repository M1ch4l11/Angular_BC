import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/stores/data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  items!: Product[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getAll('products')
      .pipe(
        tap((products: any[]) => {
          this.items = products;
          console.log(products);
        })
      )
      .subscribe(() => {});
  }
}
