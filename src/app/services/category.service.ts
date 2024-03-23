import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories() {
    let url = `http://localhost:3000/categories`;
    return this.http.get<Array<Category>>(url);
  }
}


