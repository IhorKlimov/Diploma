import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category } from '../../models/category';
import { AppStateService } from '../../services/app-state.service';
import { CategoryService } from '../../services/category.service';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgFor, FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule,],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  searchQuery: string | undefined;
  selectedCategories: Category[] = [];
  categories!: Category[];

  constructor(
    private appState: AppStateService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (v) => this.categories = v,
      error: (e) => this.appState.setError(e.error),
    });
  }

}
