import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

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
    body.set("imageUrl", imageUrl);

    let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    console.log(body)
    return this.http.post<Author>('http://localhost:3000/author', body, { headers });
  }
}
