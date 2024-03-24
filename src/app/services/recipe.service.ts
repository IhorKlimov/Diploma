import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { RecipeCreationResponse } from '../models/recipe-creation-response';
import { UpdateRecipeResponse } from '../models/update-recipe-response';
import { DeleteRecipeResponse } from '../models/delete-recipe-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipes(userId: string | null, showMyRecipes: boolean, query?: string,) {
    let url = 'http://localhost:3000/recipes';
    let headers: HttpHeaders | undefined = undefined;

    if (userId) {
      url += `userId=${userId}`;
    } else if (showMyRecipes) {
      url += '?showMyRecipes=true';
      headers = new HttpHeaders({
        'session': localStorage.getItem('session')!,
      });
    }

    console.log(headers)

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

  createRecipe(title: string, text: string, imageUrl: string, categories: Array<string>) {
    const body: any = { title, text, imageUrl, categories, };

    const headers = new HttpHeaders({
      'session': localStorage.getItem('session')!,
      'Content-Type': 'application/json',
    });

    return this.http.post<RecipeCreationResponse>(`http://localhost:3000/recipe`, body, {
      headers: headers,
    });
  }

  updateRecipe(recipeId: string, title: string, text: string, imageUrl: string, categories: Array<string>, session?: string | null) {
    const body: any = { title, text, imageUrl, recipeId, categories, };

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