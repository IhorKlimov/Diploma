import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, RouterLink, RouterLinkActive, NgIf,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'culinary_blog';
  isLoggedIn = localStorage.getItem('session') != null;

  constructor(
    private storageService: LocalStorageService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.storageService.getSession.subscribe(value => {
      this.isLoggedIn = value != null;
    });
  }

  logOut() {
    this.localStorageService.setSession(null);
  }
}
