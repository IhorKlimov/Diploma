import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { lastValueFrom } from 'rxjs';
import { Category } from '../../interfaces/category';
import { Recipe } from '../../interfaces/recipe';
import { AppStateService } from '../../services/app-state.service';
import { FavoriteRecipeService } from '../../services/favorite-recipe.service';
import { FeedService } from '../../services/feed.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule, SearchBarComponent,],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css'
})
export class MyRecipesComponent {
  searchQuery: string | undefined;
  categories!: Category[];
  recipes: Recipe[] = [];
  favoriteRecipes: string[] = [];

  constructor(
    private feedService: FeedService,
    private storageService: LocalStorageService,
    private appState: AppStateService,
    private favoriteRecipeService: FavoriteRecipeService,
  ) { }

  selectedCategories!: Category[];

  ngOnInit() {
    this.feedService.getRecipes(null, true).subscribe(data => this.recipes = data);
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
