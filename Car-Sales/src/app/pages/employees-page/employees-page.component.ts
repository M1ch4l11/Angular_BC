import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/models/employee';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { DataService } from 'src/app/stores/data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent implements OnInit {
  items!: Employee[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getAll('employees')
      .pipe(tap((employee: any[]) => (this.items = employee)))
      .subscribe(() => {});
  }
}
