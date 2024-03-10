import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private error = new Subject<string | null>();
  private message = new Subject<string | null>();

  constructor() { }

  setError(error: string | null) {
    this.error.next(error);
  }

  get getError() {
    return this.error.asObservable();
  }

  setMessage(message: string | null) {
    this.message.next(message);
  }

  get getMessage() {
    return this.message.asObservable();
  }
}
