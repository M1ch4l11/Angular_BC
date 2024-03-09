import { Injectable, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Column, Filter } from '../models/table-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:8080/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(public httpClient: HttpClient) {}

  // searchData<T>(postFix: string, findItem: string): Signal<T[]> {
  //   const url = `${this.url}${postFix}/find?search=${findItem}`;
  //   const observable = this.httpClient.get<T[]>(url);
  //   return toSignal(observable);
  // }

  searchData<T>(postFix: string, findItem: string): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${this.url}${postFix}/find?search=${findItem}`
    );
  }

  getAll(tableName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}main/${tableName}/all`);
  }

  getColumnsName(tableName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}export/${tableName}/columns`);
  }

  getCustomTable(tableName: String, body: string[]): Observable<any[]> {
    return this.httpClient.put<any[]>(
      `${this.url}export/${tableName}/table`,
      body,
      { headers: this.headers }
    );
  }

  getFilteredTable(tableName: String, body: Filter): Observable<any[]> {
    return this.httpClient.put<any[]>(
      `${this.url}export/${tableName}/filtered`,
      body,
      { headers: this.headers }
    );
  }

  downloadExcel(tableName: String, body: Filter): void {
    this.httpClient
      .put(`${this.url}export/${tableName}/excel`, body, {
        responseType: 'blob',
      })
      .subscribe(
        (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${tableName}.xlsx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          console.log('Fine works.');
        },
        (error) => {
          console.error('Error downloading Excel file:', error);
        }
      );
  }
}
