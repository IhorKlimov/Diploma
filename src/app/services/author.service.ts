import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';
import { SignUpResponse } from '../interfaces/sign-up-response';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  createAuthor(userName: string, email: string, password: string, imageUrl: string) {
    let body = new URLSearchParams();
    body.set("userName", userName);
    body.set("email", email);
    body.set("password", password);
    if (imageUrl) {
      body.set("imageUrl", imageUrl);
    }

    let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    console.log(body)
    return this.http.post<SignUpResponse>('http://localhost:3000/author', body, { headers });
  }

  logIn(email: string, password: string) {
    let body = new URLSearchParams();
    body.set("email", email);
    body.set("password", password);

    let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    console.log(body);
    return this.http.post<SignUpResponse>('http://localhost:3000/logIn', body, { headers });
  }
}
