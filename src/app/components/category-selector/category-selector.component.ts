import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category } from '../../models/category';
import { AppStateService } from '../../services/app-state.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [FormsModule, MultiSelectModule, ReactiveFormsModule,],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent implements OnInit {
  selectedCategories!: FormControl;
  @Input('selectedCategories') set _selectedCategories(value: any) {
    this.selectedCategories = value as FormControl;
  }
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
