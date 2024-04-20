import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/models/employee';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';
import { GlobalService } from 'src/app/store/global-store.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent implements OnInit {
  items = computed(() => this.globalStore.searchListItems);

  constructor(
    private dataService: DataService,
    private globalStore: GlobalService<any>
  ) {}

  ngOnInit(): void {
    this.dataService
      .getSearchFilteredTable(
        'employees',
        this.globalStore.getFilter('employees', '')
      )
      .pipe(
        tap((json: any) => {
          this.globalStore.setListItems(json.rows);
        })
      )
      .subscribe(() => {});
    this.dataService
      .getFirstPagination('employees')
      .pipe(
        tap((json: any) => {
          this.globalStore.setPagination(json.pagination);
        })
      )
      .subscribe(() => {});
  }
}
