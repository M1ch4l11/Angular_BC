import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';
import { FormEvent, ItemType } from 'src/app/models/item-type';
import { SearchComponent } from '../search/search.component';
import { FormTemplatesService } from 'src/app/services/form-templates.service';
import { GlobalService } from 'src/app/store/global-store.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { FacadeListService } from './facade-list.service';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule, ItemComponent, SearchComponent, PaginationComponent],
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent<T> implements OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;
  @Input() type!: ItemType;
  items = computed(() => this.globalStore.searchListItems());

  constructor(
    private formTemplates: FormTemplatesService,
    private globalStore: GlobalService<any>,
    private facadeService: FacadeListService
  ) {}

  onloadComponent(event: FormEvent): void {
    this.formTemplates.loadComponent(this.dynamicComponentContainer, event);
  }

  deleteItemEvent(event: any): void {
    this.facadeService.deleteItemEvent(event, this.type);
  }

  ngOnDestroy(): void {
    this.facadeService.destroyEvent();
  }
}
