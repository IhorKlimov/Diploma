import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Difficulty } from '../../models/difficulty';
import { AppStateService } from '../../services/app-state.service';
import { DifficultyService } from '../../services/difficulty.service';

@Component({
  selector: 'app-difficulty-selector',
  standalone: true,
  imports: [FormsModule, MultiSelectModule, ReactiveFormsModule,],
  templateUrl: './difficulty-selector.component.html',
  styleUrl: './difficulty-selector.component.css'
})
export class DifficultySelectorComponent {
  selectedDifficulties!: FormControl;
  @Input('selectedDifficulties') set _selectedDifficulties(value: any) {
    this.selectedDifficulties = value as FormControl;
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
