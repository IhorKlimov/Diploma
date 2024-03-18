import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe';
import { RecipeCreationResponse } from '../interfaces/recipe-creation-response';
import { UpdateRecipeResponse } from '../interfaces/update-recipe-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipe(id: string, verifyAuthor: boolean = false, session?: string | null,) {
    let url = `http://localhost:3000/recipe?id=${id}`;
    let headers = new HttpHeaders();

    if (verifyAuthor) {
      url += '&verifyAuthor=true';
      if (session) {
        headers = headers.set('session', session);
      }
    }

    return this.http.get<Recipe>(url, { headers });
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

  updateRecipe(recipeId: string, title: string, text: string, imageUrl: string, session?: string | null) {
    const body = new URLSearchParams();
    body.set('title', title);
    body.set('text', text);
    body.set('imageUrl', imageUrl);
    body.set('recipeId', recipeId);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    if (session) {
      headers = headers.set('session', session);
    }

    return this.http.put<UpdateRecipeResponse>(`http://localhost:3000/recipe`, body, {
      headers,
    });
  }
}