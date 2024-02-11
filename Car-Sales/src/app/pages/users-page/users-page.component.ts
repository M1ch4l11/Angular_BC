import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/models/employee';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import employee from '../../../assets/employees.json';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ListItemsComponent],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent {
  items: Employee[] = employee;
}
