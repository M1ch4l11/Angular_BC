import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter, TableContent } from 'src/app/models/table-type';
import { DataService } from 'src/app/stores/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns!: string[];
  @Input() filterRequest!: Filter;
  @Input() tableContent!: TableContent;

  constructor(private dataService: DataService) {}

  public exportExcel(): void {
    this.dataService.downloadExcel(
      this.tableContent.tableName,
      this.filterRequest
    );
  }
}
