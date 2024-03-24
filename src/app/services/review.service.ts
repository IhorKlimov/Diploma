import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { ReviewCreationResponse } from '../models/review-creation-response';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviews(recipeId: string) {
    let url = `http://localhost:3000/reviews?recipeId=${recipeId}`;
    return this.http.get<Array<Review>>(url);
  }

  createReview(recipeId: string, text: string, stars?: number, session?: string | null) {
    const body: any = { text, recipeId };
    if (stars) {
      body.stars = stars;
    }

    const headers = new HttpHeaders({
      'session': session ?? '',
      'Content-Type': 'application/json',
    });

    return this.http.post<ReviewCreationResponse>(`http://localhost:3000/review`, body, {
      headers,
    });
  }
}
