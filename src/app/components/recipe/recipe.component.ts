import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RatingModule } from 'primeng/rating';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';
import { ReviewComponent } from '../review/review.component';
import { Review } from '../../interfaces/review';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Author } from '../../interfaces/author';
import { RecipeService } from '../../services/recipe.service';
import { ReviewService } from '../../services/review.service';
import { AppStateService } from '../../services/app-state.service';
import { AuthorService } from '../../services/author.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RatingModule, FormsModule, NgFor, ReviewComponent, InputTextModule, ButtonModule, AvatarModule, InputTextareaModule,
    FormsModule, ReactiveFormsModule,],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  @Input()
  id!: string
  recipe!: Recipe;
  reviews: Review[] = [];
  currentUser?: Author | null;
  form!: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private reviewService: ReviewService,
    private appStateService: AppStateService,
    private authorService: AuthorService,
    private storageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl(null, [Validators.required]),
      stars: new FormControl(null, []),
    }, {});
    this.recipeService.getRecipe(this.id).subscribe(data => this.recipe = data);
    this.reviewService.getReviews(this.id).subscribe({
      next: (v) => this.reviews = v,
      error: (e) => this.appStateService.setError(e.error),
    });
    this.storageService.getSession.subscribe(value => {
      if (value != null) {
        this.fetchUser(value);
      }
    });
    this.appStateService.getUserUpdated.subscribe(value => {
      const sessionId = localStorage.getItem('session');
      if (sessionId) {
        this.fetchUser(sessionId);
      }
    });
    this.fetchUser(localStorage.getItem('session') ?? '');
  }

  fetchUser(session: string) {
    this.authorService.getUser(null, session).subscribe(
      {
        next: (v) => this.currentUser = v,
        error: (e) => this.appStateService.setError(e.error),
      }
    );
  }

  async addComment() {
    console.log('submit')
    try {
      const result = await lastValueFrom(this.reviewService.createReview(
        this.id, this.form.get('text')?.value, this.form.get('stars')?.value, localStorage.getItem('session'),
      ));

      this.form.get('text')?.setValue(null);
      this.form.get('stars')?.setValue(null);

      this.reviews.unshift(result.review);
      this.reviews = [...this.reviews];
    } catch (e: any) {
      console.log(e)
      this.appStateService.setError(e.error);
    }
  }

}
