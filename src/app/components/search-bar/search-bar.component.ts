import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SearchQuery } from '../../models/search-query';
import { AppStateService } from '../../services/app-state.service';
import { CategoryService } from '../../services/category.service';
import { CategorySelectorComponent } from '../category-selector/category-selector.component';
import { DifficultySelectorComponent } from '../difficulty-selector/difficulty-selector.component';
import { FeedRecipeComponent } from '../feed-recipe/feed-recipe.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FeedRecipeComponent, FormsModule, InputTextModule, MultiSelectModule, CategorySelectorComponent, ReactiveFormsModule,
    DifficultySelectorComponent,],
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
      selectedDifficulty: new FormControl(null, []),
      selectedCategories: new FormControl(null, []),
    }, {});

    this.form.valueChanges.subscribe(val => {
      this.onSearchChanged.emit(val);
    });
  }

}
