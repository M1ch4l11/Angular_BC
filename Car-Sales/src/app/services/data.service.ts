import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filter, PaginationRequest, SearchFilter } from '../models/table-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://0.0.0.0:8080/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(public httpClient: HttpClient) {}

  searchData<T>(postFix: string, findItem: string): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${this.url}${postFix}/find?search=${findItem}`
    );
  }

  getAll(tableName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}main/${tableName}/all`);
  }

  deleteRecord(tableName: string, id: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.url}main/${tableName}/${id}${
        typeof id === 'string' ? '/char' : ''
      }`
    );
  }

  createRecord(tableName: string, body: any): Observable<string> {
    return this.httpClient.post<any>(`${this.url}${tableName}/create`, body);
  }

  updateRecord(tableName: string, body: any): Observable<string> {
    return this.httpClient.put<any>(`${this.url}${tableName}/update`, body);
  }

  getAllForTable(tableName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}main/${tableName}/table/all`);
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

  getFilteredTable(tableName: String, body: Filter): Observable<any> {
    return this.httpClient.put<any>(
      `${this.url}export/${tableName}/filtered`,
      body,
      { headers: this.headers }
    );
  }

  authUser(body: SearchFilter): Observable<any> {
    return this.httpClient.post<any>(`${this.url}auth/user`, body, {
      headers: this.headers,
    });
  }

  getFilteredTablePaginationEvent(
    tableName: string,
    body: PaginationRequest
  ): Observable<any[]> {
    return this.httpClient.post<any[]>(
      `${this.url}search/${tableName}/pagination/full`,
      body,
      { headers: this.headers }
    );
  }

  getFirstPagination(tableName: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.url}search/${tableName}/pagination`
    );
  }

  getSearchFilteredTable(
    tableName: String,
    body: SearchFilter
  ): Observable<any[]> {
    return this.httpClient.put<any[]>(
      `${this.url}search/${tableName}/bar`,
      body,
      { headers: this.headers }
    );
  }

  downloadExcel(tableName: String, body: Filter): void {
    console.log(tableName, body);

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
