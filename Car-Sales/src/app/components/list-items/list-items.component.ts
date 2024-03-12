import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { FormEvent, ItemType } from 'src/app/models/item-type';
import { SearchComponent } from '../search/search.component';
import { FormTemplatesService } from 'src/app/services/form-templates.service';
import { GlobalService } from 'src/app/stores/global-store.service';
interface User {
  login: string;
  password: string;
}
@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, ItemComponent, SearchComponent],
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent<T> {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;
  @Input() type!: ItemType;
  items = computed(() => this.globalStore.searchListItems());

  constructor(
    private formTemplates: FormTemplatesService,
    private globalStore: GlobalService<any>
  ) {}

  onloadComponent(event: FormEvent): void {
    this.formTemplates.loadComponent(this.dynamicComponentContainer, event);
  }

  deleteItemEvent(event: Event): void {
    // this.items = this.items.filter((item) => item !== event);
    // Todu: remove from databes also
  }
}
