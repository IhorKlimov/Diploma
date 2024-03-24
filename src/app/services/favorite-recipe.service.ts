import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteRecipeStatus } from '../models/favorite-recipe-status';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class FavoriteRecipeService {

  constructor(private http: HttpClient) { }

  getFavoriteRecipeIds(session?: string) {
    let url = 'http://localhost:3000/favorite-recipe-ids';

    let headers = new HttpHeaders();
    if (session) {
      headers = headers.set('session', session);
    }
    return this.http.get<Array<string>>(url, { headers });
  }

  getFavoriteRecipes(session?: string) {
    let url = 'http://localhost:3000/favorite-recipes';

    let headers = new HttpHeaders();
    if (session) {
      headers = headers.set('session', session);
    }
    return this.http.get<Array<Recipe>>(url, { headers });
  }

  getFavoriteRecipeStatus(recipeId: string, session?: string) {
    let url = `http://localhost:3000/favorite-recipe-status?recipeId=${recipeId}`;

    let headers = new HttpHeaders();
    if (session) {
      headers = headers.set('session', session);
    }
    return this.http.get<FavoriteRecipeStatus>(url, { headers });
  }

  toggleFavoriteRecipe(recipeId: string, session?: string) {
    const body: any = { recipeId, };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (session) {
      headers = headers.set('session', session);
    }

    return this.http.post<FavoriteRecipeStatus>(`http://localhost:3000/favorite-recipe`, body, {
      headers,
    });
  }
}
