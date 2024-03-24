import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category } from '../../models/category';
import { AppStateService } from '../../services/app-state.service';
import { CategoryService } from '../../services/category.service';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';
import { CategorySelectorComponent } from '../category-selector/category-selector.component';
import { SearchQuery } from '../../models/search-query';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule, CategorySelectorComponent, ReactiveFormsModule,],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  form!: FormGroup;
  @Output() onSearchChanged = new EventEmitter<SearchQuery>();

  constructor(
    private appState: AppStateService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      query: new FormControl(null, []),
      selectedCategories: new FormControl(null, []),
    }, {});

    this.form.valueChanges.subscribe(val => {
      this.onSearchChanged.emit(val);
    });
  }

}
