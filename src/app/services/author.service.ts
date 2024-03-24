import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { SignUpResponse } from '../models/sign-up-response';
import { AuthorUpdateResult } from '../models/author-update-result';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  createAuthor(userName: string, email: string, password: string, imageUrl: string) {
    let body: any = { userName, email, password, };
    if (imageUrl) {
      body.imageUrl = imageUrl;
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignUpResponse>('http://localhost:3000/author', body, { headers });
  }

  logIn(email: string, password: string) {
    let body: any = { email, password, };
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignUpResponse>('http://localhost:3000/logIn', body, { headers });
  }

  getUser(userId: string | null, session: string | null,) {
    let url = 'http://localhost:3000/author';

    let headers = new HttpHeaders();
    if (session) {
      url += '?getMyProfile=true'
      headers = headers.set('session', session);
    } else if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get<Author>(url, { headers });
  }

  updateUser(userName: string, imageUrl: string, session: string,) {
    let url = 'http://localhost:3000/author';

    let headers = new HttpHeaders({
      'session': session,
      'Content-Type': 'application/json',
    });

    let body: any = { userName, imageUrl, };
    return this.http.put<AuthorUpdateResult>(url, body, { headers });
  }
}


