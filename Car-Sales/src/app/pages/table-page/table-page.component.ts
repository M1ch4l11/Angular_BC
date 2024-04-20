import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/components/table/table.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Column, Filter, TableContent } from 'src/app/models/table-type';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    FilterComponent,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  // TODO add all tables, but somewhere else
  tables: string[] = [
    'products',
    'employees',
    'orders',
    'customer',
    'offices',
    'orderdetails',
    'payments',
    'productlines',
  ];
  columns!: string[];
  customColumns: Column[] = [];
  tableColumnContent!: TableContent;
  tableName!: string;
  disableFilterColumns: boolean = false;
  filterRequest: Filter = {
    columnName: '',
    firstCondition: '',
    firstConditionValue: '',
    secondCondition: '',
    secondConditionValue: '',
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  getFilteredTable(): void {
    this.dataService
      .getFilteredTable(this.tableName, this.filterRequest)
      .pipe(
        tap((values) => {
          this.tableColumnContent = {
            tableName: this.tableName,
            rows: values.map((object: any) => Object.values(object)),
          };
        })
      )
      .subscribe(() => {});
  }

  getCustomTable(): void {
    this.dataService
      .getCustomTable(
        this.tableName,
        this.customColumns.filter((o) => !!o.name).map((o) => o.name)
      )
      .pipe(
        tap((values) => {
          this.tableColumnContent = {
            tableName: this.tableName,
            rows: values.map((object) => Object.values(object)),
          };
          this.disableFilterColumns = true;
        })
      )
      .subscribe(() => {});
  }

  selectTable(tableName: any) {
    this.tableName = tableName;
    this.filterRequest = {
      columnName: '',
      firstCondition: '',
      firstConditionValue: '',
      secondCondition: '',
      secondConditionValue: '',
    };
    this.dataService
      .getAllForTable(this.tableName)
      .pipe(
        tap((values) => {
          this.tableColumnContent = {
            tableName: this.tableName,
            rows: values.map((object) => Object.values(object)),
          };
          this.initColumn();
        })
      )
      .subscribe(() => {});
  }

  changeSecondCondition(): void {
    if (this.filterRequest.firstCondition === 'less')
      this.filterRequest.secondCondition = 'more';
    else if (this.filterRequest.firstCondition === 'more')
      this.filterRequest.secondCondition = 'less';
    else this.filterRequest.secondCondition = undefined;
  }

  changeCustomColumn(column: any): void {
    // this.customColumns[
    //   this.customColumns.findIndex((item) => item.id === column.id)
    // ] = column;
    this.filterRequest = {
      columnName: column.name,
    };
    // todo: nesuvysi s tym ako pojdu funkcie, doplnkova uloha: vytvorit modely z databazy na zaklade selectu
    // poziadavka na backend aby vratil sfiltrovane data podla stlpcov
    // parsovat data do tableColumnContent
    /* 
    postup: back-end posle objekty ktore nebudu mat vsetky stlpce ako model,
    preto treba dat variables in model ako optional
    */
  }

  initColumn(): void {
    // request to backend for all columns
    // add columns into object
    // initCustomColumn neeed to be in async method...
    if (!this.tableName) return;
    this.dataService
      .getColumnsName(
        this.tableName === 'customer' ? 'customers' : this.tableName
      )
      .pipe(
        tap((o) => {
          console.log(o);
          this.columns = o;
          this.initCustomColumns();
          this.disableFilterColumns = true;
        })
      )
      .subscribe(() => {});
  }

  initCustomColumns(): void {
    this.customColumns = [];
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
