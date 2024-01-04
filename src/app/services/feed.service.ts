import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<Array<Recipe>>('http://localhost:3000/recipes');
  }
}