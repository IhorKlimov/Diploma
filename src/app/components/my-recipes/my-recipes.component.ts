import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { NgFor } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { Category } from '../../interfaces/category';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css'
})
export class MyRecipesComponent {
  searchQuery: string | undefined;
  categories!: Category[];

  constructor(private feedService: FeedService) { }

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
    this.feedService.getRecipes(null, true).subscribe(data => this.recipes = data);
  }

  recipes: Recipe[] = []
}
