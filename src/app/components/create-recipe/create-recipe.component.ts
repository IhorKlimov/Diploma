import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EditorInitEvent, EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { lastValueFrom } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, RouterLink, EditorModule,],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private recipeService: RecipeService,
    private appStateService: AppStateService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, []),
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    }, {});
  }

  onInitEditor(e: EditorInitEvent) {
    // e.editor.focus();
  }

  async onSubmit() {
    console.log(this.form.get('text')?.value);

    try {
      const response = await lastValueFrom(this.recipeService.createRecipe(
        this.form.get('title')?.value,
        this.form.get('text')?.value,
        'demo',
      ));

      this.router.navigate([`recipe/${response.recipeId}`]);
      this.appStateService.setMessage('Created a new recipe');
    } catch (error: any) {
      this.appStateService.setError(error.error);

      if (error.status == 401) {
        this.localStorageService.setSession(null);
        this.router.navigate(['/']);
      }
    }
  }
}
