import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipe(id: string) {
    return this.http.get<Recipe>(`http://localhost:3000/recipe?id=${id}`);
  }
}