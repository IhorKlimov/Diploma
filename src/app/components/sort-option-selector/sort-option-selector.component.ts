import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortOption } from '../../models/sort-option';
import { AppStateService } from '../../services/app-state.service';
import { SortOptionService } from '../../services/sort-option.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-sort-option-selector',
  standalone: true,
  imports: [FormsModule, MultiSelectModule, ReactiveFormsModule, DropdownModule,],
  templateUrl: './sort-option-selector.component.html',
  styleUrl: './sort-option-selector.component.css'
})
export class SortOptionSelectorComponent {
  sortBy!: FormControl;
  @Input('sortBy') set _sortBy(value: any) {
    this.sortBy = value as FormControl;
  }
  sortOptions!: SortOption[];

  constructor(
    private appState: AppStateService,
    private sortOptionServiceService: SortOptionService,
  ) { }

  ngOnInit(): void {
    this.sortOptionServiceService.getSortOptions().subscribe({
      next: (v) => {
        this.sortBy.setValue(v[0]);
        this.sortOptions = v;
      },
      error: (e) => this.appState.setError(e.error),
    });
  }
}
