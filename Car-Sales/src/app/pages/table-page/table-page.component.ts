import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/components/table/table.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Column, TableColumnContent } from 'src/app/models/table-type';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule, TableComponent, FilterComponent, MatSelectModule],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  tables: string[] = ['Ano', 'Nie', 'Mozno', 'Preto'];
  columns!: string[];
  customColumns: Column[] = [];
  tableColumnContent!: TableColumnContent;
  tableName!: string;

  ngOnInit(): void {
    this.initColumn();
  }

  selectTable(tableName: any) {
    this.tableName = tableName;
  }

  changeCustomColumn(column: any): void {
    this.customColumns[
      this.customColumns.findIndex((item) => item.id === column.id)
    ] = column;
    // todo: nesuvysi s tym ako pojdu funkcie, doplnkova uloha: vytvorit modely z databazy na zaklade selectu
    // poziadavka na backend aby vratil sfiltrovane data podla stlpcov
    // parsovat data do tableColumnContent
    /* 
    postup: back-end posle objekty ktore nebudu mat vsetky stlpce ako model,
    preto treba dat variables in model ako optional
    */
    this.tableColumnContent = {
      tableName: this.tableName,
      rows: [
        {
          id: 1,
          values: ['michal', 'Kroslak', 'ide', 'ano', 'neviem', 'mozno'],
        },
        {
          id: 2,
          values: ['Terezka', 'Bambus', 'ide', 'ano', 'neviem', 'mozno'],
        },
        {
          id: 3,
          values: ['Lucia', 'Trhana', 'ide', 'ano', 'neviem', 'mozno'],
        },
        {
          id: 4,
          values: ['Barbora', 'Malinka', 'ide', 'ano', 'neviem', 'mozno'],
        },
      ],
    };
  }

  initColumn(): void {
    // request to backend for all columns
    // add columns into object
    // initCustomColumn neeed to be in async method...
    this.columns = ['Michal', 'Ondrej', 'Tomas', 'Jarka', 'Damian', 'Ondrej'];
    this.initCustomColumns();
  }

  initCustomColumns(): void {
    let poc = 1;
    this.columns.forEach(() => {
      this.customColumns.push({ id: poc++, name: '' });
    });
  }

  getColumnsArray(): number[] {
    return Array.from(
      { length: this.customColumns.length },
      (_, index) => index + 1
    );
  }
}
