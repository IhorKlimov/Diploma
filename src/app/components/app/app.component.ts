import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { Author } from '../../models/author';
import { AppStateService } from '../../services/app-state.service';
import { AuthorService } from '../../services/author.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, RouterLink, RouterLinkActive, NgIf, ToastModule,
    AvatarModule, AvatarGroupModule, OverlayPanelModule, ButtonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'culinary_blog';
  isLoggedIn = localStorage.getItem('session') != null;
  user?: Author | null;

  constructor(
    private storageService: LocalStorageService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private appStateService: AppStateService,
    private router: Router,
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
    this.storageService.getSession.subscribe(value => {
      this.isLoggedIn = value != null;
      if (value != null) {
        this.fetchUser(value);
      }
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
    this.appStateService.getUserUpdated.subscribe(value => {
      const sessionId = localStorage.getItem('session');
      if (sessionId) {
        this.fetchUser(sessionId);
      }
    });
    this.localStorageService.setSession(localStorage.getItem('session'));
  }

  fetchUser(session: string) {
    this.authorService.getUser(null, session).subscribe(
      {
        next: (v) => this.user = v,
        error: (e) => this.appStateService.setError(e.error),
      }
    );
  }

  logOut(op: any) {
    this.localStorageService.setSession(null);
    this.router.navigate(['/']);
    this.hideOverlay(op);
  }

  hideOverlay(op: any) {
    op.hide();
  }
}
