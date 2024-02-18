import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Column } from 'src/app/models/table-type';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() columnEvent = new EventEmitter<Column>();
  @Input() id!: number;
  @Input() columns!: string[];
  columnName = '';

  newColumnName(event: any) {
    // for mat-select
    this.columnName = event;
    this.columnEvent.emit({ id: this.id, name: event });

    // for basic select
    // this.columnName = event.target.value;
    // this.columnEvent.emit({ id: this.id, columnName: event.target.value });
  }
}
