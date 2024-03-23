import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) { }

  getRecipes(userId: string | null, showMyRecipes: boolean) {
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
}