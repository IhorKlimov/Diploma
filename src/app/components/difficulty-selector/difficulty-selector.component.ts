import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Difficulty } from '../../models/difficulty';
import { AppStateService } from '../../services/app-state.service';
import { DifficultyService } from '../../services/difficulty.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-difficulty-selector',
  standalone: true,
  imports: [FormsModule, MultiSelectModule, ReactiveFormsModule, DropdownModule,],
  templateUrl: './difficulty-selector.component.html',
  styleUrl: './difficulty-selector.component.css'
})
export class DifficultySelectorComponent {
  selectedDifficulty!: FormControl;
  @Input('selectedDifficulty') set _selectedDifficulty(value: any) {
    this.selectedDifficulty = value as FormControl;
  }
  difficulties!: Difficulty[];

  constructor(
    private appState: AppStateService,
    private difficultyService: DifficultyService,
  ) { }

  ngOnInit(): void {
    this.difficultyService.getDifficulties().subscribe({
      next: (v) => this.difficulties = v,
      error: (e) => this.appState.setError(e.error),
    });
  }

}
