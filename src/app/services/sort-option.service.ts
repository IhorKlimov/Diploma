import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortOption } from '../models/sort-option';

@Injectable({
  providedIn: 'root'
})
export class SortOptionService {

  constructor(private http: HttpClient) { }

  getSortOptions() {
    let url = `http://localhost:3000/sort-options`;
    return this.http.get<Array<SortOption>>(url);
  }
}
