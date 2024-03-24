import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Difficulty } from '../models/difficulty';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor(private http: HttpClient) { }

  getDifficulties() {
    let url = `http://localhost:3000/difficulties`;
    return this.http.get<Array<Difficulty>>(url);
  }
}
