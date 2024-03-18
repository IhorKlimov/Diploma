import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe';
import { RecipeCreationResponse } from '../interfaces/recipe-creation-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipe(id: string, verifyAuthor: boolean = false) {
    let url = `http://localhost:3000/recipe?id=${id}`;

    if (verifyAuthor) {
      url += 'verifyAuthor=true';
    }

    return this.http.get<Recipe>(url);
  }

  createRecipe(title: string, text: string, imageUrl: string) {
    const body = new URLSearchParams();
    body.set('title', title);
    body.set('text', text);
    body.set('imageUrl', imageUrl);

    const headers = new HttpHeaders({
      'session': localStorage.getItem('session')!,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<RecipeCreationResponse>(`http://localhost:3000/recipe`, body, {
      headers: headers,
    });
  }
}