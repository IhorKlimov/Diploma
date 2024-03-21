import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { Recipe } from '../../interfaces/recipe';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { MultiSelectModule } from 'primeng/multiselect';
import { FeedService } from '../../services/feed.service';
import { FavoriteRecipeService } from '../../services/favorite-recipe.service';
import { AppStateService } from '../../services/app-state.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: string | undefined;
  categories!: Category[];
  favoriteRecipes: string[] = [];
  recipes: Recipe[] = [];

  constructor(
    private feedService: FeedService,
    private favoriteRecipeService: FavoriteRecipeService,
    private storageService: LocalStorageService,
    private appState: AppStateService,
  ) { }

  selectedCategories!: Category[];

  ngOnInit() {
    this.categories = [
      {
        id: 1,
        name: "Appetizers"
      },
      {
        id: 2,
        name: "Salads"
      },
      {
        id: 3,
        name: "Main course"
      },
      {
        id: 4,
        name: "Deserts"
      },
    ];
    this.feedService.getRecipes(null, false).subscribe(data => this.recipes = data);
    this.storageService.getSession.subscribe(value => {
      this.fetchFavoriteRecipes(value);
    });

    this.fetchFavoriteRecipes(localStorage.getItem('session'));
  }

  fetchFavoriteRecipes(session?: string | null) {
    if (session) {
      this.favoriteRecipeService.getFavoriteRecipeIds(session).subscribe({
        next: (d) => {
          console.log(d);
          this.favoriteRecipes = d;
        }
      });
    }
  }

  async onFavoriteClicked(recipeId: string) {
    if (this.favoriteRecipes.includes(recipeId)) {
      const index = this.favoriteRecipes.indexOf(recipeId);
      if (index > -1) {
        this.favoriteRecipes.splice(index, 1);
      }
    } else {
      this.favoriteRecipes.push(recipeId);
    }
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const result = await lastValueFrom(this.favoriteRecipeService.toggleFavoriteRecipe(recipeId, session));
        console.log(result);
      } catch (error: any) {
        console.log(error);
        this.appState.setError(error.error);
      }
    }
  }
}
