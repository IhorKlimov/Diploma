import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { RecipeCreationResponse } from '../models/recipe-creation-response';
import { UpdateRecipeResponse } from '../models/update-recipe-response';
import { DeleteRecipeResponse } from '../models/delete-recipe-response';
import { SearchQuery } from '../models/search-query';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipes(userId: string | null, showMyRecipes: boolean, query?: SearchQuery,) {
    let url = 'http://localhost:3000/recipes';
    let headers: HttpHeaders | undefined = undefined;
    let params = new HttpParams();

    if (userId) {
      params = params.append("userId", userId);
    } else if (showMyRecipes) {
      params = params.append("showMyRecipes", true);
      headers = new HttpHeaders({
        'session': localStorage.getItem('session')!,
      });
    }

    if (query) {
      if (query.query) {
        params = params.append("query", query.query);
      }
      if (query.selectedCategories) {
        params = params.append("categories", query.selectedCategories.map(c => c._id).toString());
      }
    }

    if (params.toString().length != 0) {
      url += `?${params.toString()}`;
    }
    console.log(url);

    return this.http.get<Array<Recipe>>(url, { headers });
  }

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

  createRecipe(
    title: string,
    text: string,
    imageUrl: string,
    categories: Array<string>,
    difficulty: string,
  ) {
    const body = { title, text, imageUrl, categories, difficulty, };

    const headers = new HttpHeaders({
      'session': localStorage.getItem('session')!,
      'Content-Type': 'application/json',
    });

    return this.http.post<RecipeCreationResponse>(`http://localhost:3000/recipe`, body, {
      headers: headers,
    });
  }

  updateRecipe(
    recipeId: string,
    title: string,
    text: string,
    imageUrl: string,
    categories: Array<string>,
    difficulty: string,
    session?: string | null
  ) {
    const body = { title, text, imageUrl, recipeId, categories, difficulty, };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (session) {
      headers = headers.set('session', session);
    }

    return this.http.put<UpdateRecipeResponse>(`http://localhost:3000/recipe`, body, {
      headers,
    });
  }

  deleteRecipe(recipeId: string, session: string | null) {
    const body: any = { recipeId, };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (session) {
      headers = headers.set('session', session);
    }

    return this.http.delete<DeleteRecipeResponse>(`http://localhost:3000/recipe`, {
      headers,
      body,
    },
    );
  }
}