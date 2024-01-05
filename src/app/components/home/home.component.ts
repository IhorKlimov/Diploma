import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { Recipe } from '../../interfaces/recipe';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { MultiSelectModule } from 'primeng/multiselect';
import { FeedService } from '../../services/feed.service';

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
    this.feedService.getRecipes().subscribe(data => this.recipes = data);
  }

  recipes: Recipe[] = []

}
