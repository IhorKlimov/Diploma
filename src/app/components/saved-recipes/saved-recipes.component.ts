import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Category } from '../../interfaces/category';
import { NgFor } from '@angular/common';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Recipe } from '../../interfaces/recipe';
import { FavoriteRecipeService } from '../../services/favorite-recipe.service';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  searchQuery: string | undefined;
  categories!: Category[];

  constructor(
    private feedService: FeedService,
    private favoriteRecipesService: FavoriteRecipeService,
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
    // this.favoriteRecipesService.getFavoriteRecipeIds(null, true).subscribe(data => this.recipes = data);
  }

  recipes: Recipe[] = []
}

