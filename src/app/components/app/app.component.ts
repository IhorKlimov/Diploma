import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, RouterLink, RouterLinkActive, NgIf, ToastModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'culinary_blog';
  isLoggedIn = localStorage.getItem('session') != null;

  constructor(
    private storageService: LocalStorageService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private appStateService: AppStateService,
  ) { }

  ngOnInit() {
    this.storageService.getSession.subscribe(value => {
      this.isLoggedIn = value != null;
    });
    this.appStateService.getError.subscribe(error => {
      if (error != null) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    });
    this.appStateService.getMessage.subscribe(message => {
      if (message != null) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      }
    });
  }

  logOut() {
    this.localStorageService.setSession(null);
  }
}
