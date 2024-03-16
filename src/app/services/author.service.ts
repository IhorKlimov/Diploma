import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';
import { SignUpResponse } from '../interfaces/sign-up-response';
import { AuthorUpdateResult } from '../interfaces/author-update-result';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  createAuthor(userName: string, email: string, password: string, imageUrl: string) {
    let body = new URLSearchParams();
    body.set('userName', userName);
    body.set('email', email);
    body.set('password', password);
    if (imageUrl) {
      body.set('imageUrl', imageUrl);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<SignUpResponse>('http://localhost:3000/author', body, { headers });
  }

  logIn(email: string, password: string) {
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
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

  updateUser(userName: string, imageUrl: string | null, session: string,) {
    let url = 'http://localhost:3000/author';

    let headers = new HttpHeaders({
      'session': session,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let body = new URLSearchParams();
    body.set('userName', userName);
    if (imageUrl) {
      body.set('imageUrl', imageUrl);
    }

    return this.http.put<AuthorUpdateResult>(url, body, { headers });
  }
}


