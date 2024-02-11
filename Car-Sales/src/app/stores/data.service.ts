import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:5000/';

  constructor(private httpClient: HttpClient) {}

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
}
