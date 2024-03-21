import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteRecipeStatus } from '../interfaces/favorite-recipe-status';

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

  getFavoriteRecipeStatus(recipeId: string, session?: string) {
    let url = `http://localhost:3000/favorite-recipe-status?recipeId=${recipeId}`;

    let headers = new HttpHeaders();
    if (session) {
      headers = headers.set('session', session);
    }
    return this.http.get<FavoriteRecipeStatus>(url, { headers });
  }

  toggleFavoriteRecipe(recipeId: string, session?: string) {
    const body = new URLSearchParams();
    body.set('recipeId', recipeId);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    if (session) {
      headers = headers.set('session', session);
    }

    return this.http.post<FavoriteRecipeStatus>(`http://localhost:3000/favorite-recipe`, body, {
      headers,
    });
  }
}
