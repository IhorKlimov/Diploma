import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private session = new Subject<string | null>();

  constructor() {
    this.session.next(localStorage.getItem('session'));
  }

  setSession(session: string | null) {
    if (session) {
      localStorage.setItem('session', session);
    } else {
      localStorage.removeItem('session');
    }
    this.session.next(session);
  }

  get getSession() {
    return this.session.asObservable();
  }
}
