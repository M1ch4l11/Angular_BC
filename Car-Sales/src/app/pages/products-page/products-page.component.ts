import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import products from '../../../assets/products.json';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  items: Product[] = products;
}
