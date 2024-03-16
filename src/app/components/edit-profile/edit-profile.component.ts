import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../interfaces/author';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: Author | null = null;

  constructor(
    private authorService: AuthorService,
    private appStateService: AppStateService,
  ) { }


  ngOnInit(): void {
    this.authorService.getUser(null, localStorage.getItem('session')).subscribe(
      {
        next: (u) => this.user = u,
        error: (error) => this.appStateService.setError(error.error),
      }
    );
  }


}
