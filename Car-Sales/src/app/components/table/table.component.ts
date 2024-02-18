import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, TableColumnContent } from 'src/app/models/table-type';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() customColumns!: Column[];
  @Input() tableContent!: TableColumnContent;
}
