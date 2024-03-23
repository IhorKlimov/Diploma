import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { lastValueFrom } from 'rxjs';
import { Category } from '../../models/category';
import { Recipe } from '../../models/recipe';
import { AppStateService } from '../../services/app-state.service';
import { FavoriteRecipeService } from '../../services/favorite-recipe.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FeedRecipeComponent } from '../../components/feed-recipe/feed-recipe.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule, SearchBarComponent,],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  recipes: Recipe[] = [];

  constructor(
    private storageService: LocalStorageService,
    private appState: AppStateService,
    private favoriteRecipesService: FavoriteRecipeService,
  ) { }

  selectedCategories!: Category[];

  ngOnInit() {
    this.storageService.getSession.subscribe(value => {
      this.fetchFavoriteRecipes(value);
    });

    this.fetchFavoriteRecipes(localStorage.getItem('session'));
  }


  fetchFavoriteRecipes(session?: string | null) {
    if (session) {
      this.favoriteRecipesService.getFavoriteRecipes(session).subscribe({
        next: (d) => {
          console.log(d);
          this.recipes = d;
        }
      });
    }
  }

  async onFavoriteClicked(recipeId: string) {
    const index = this.recipes.map(r => r._id).indexOf(recipeId);
    if (index > -1) {
      this.recipes.splice(index, 1);
    }
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const result = await lastValueFrom(this.favoriteRecipesService.toggleFavoriteRecipe(recipeId, session));
        console.log(result);
      } catch (error: any) {
        console.log(error);
        this.appState.setError(error.error);
      }
    }
  }
}

