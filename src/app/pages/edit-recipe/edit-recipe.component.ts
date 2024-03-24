import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ImageCroppedEvent, ImageCropperModule, base64ToFile } from 'ngx-image-cropper';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { lastValueFrom } from 'rxjs';
import { CategorySelectorComponent } from '../../components/category-selector/category-selector.component';
import { AppStateService } from '../../services/app-state.service';
import { FileStorageService } from '../../services/file-storage.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RecipeService } from '../../services/recipe.service';
import { Category } from '../../models/category';
import { DifficultySelectorComponent } from '../../components/difficulty-selector/difficulty-selector.component';
import { Difficulty } from '../../models/difficulty';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  providers: [ConfirmationService,],
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule, ImageCropperModule, DialogModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, RouterLink, EditorModule, ConfirmDialogModule,
    CategorySelectorComponent, DifficultySelectorComponent,],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  @Input()
  recipeId!: string;

  form!: FormGroup;
  showCropModal = false;
  imageChangedEvent: any = '';
  originalFile: File | null = null;
  croppedImageBase64: any = '';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private recipeService: RecipeService,
    private appStateService: AppStateService,
    private fileStorageService: FileStorageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, [Validators.required]),
      originalPhoto: new FormControl(null, []),
      photoFile: new FormControl(null, []),
      selectedCategories: new FormControl([], [Validators.required]),
      selectedDifficulty: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    }, {});
    this.recipeService.getRecipe(this.recipeId, true, localStorage.getItem('session')).subscribe({
      next: (r) => {
        this.form.get('title')?.setValue(r.title);
        this.form.get('text')?.setValue(r.description);
        this.form.get('photo')?.setValue(r.imageUrl);
        this.form.get('selectedCategories')?.setValue(r.categories);
        this.form.get('selectedDifficulty')?.setValue(r.difficulty);
      },
      error: (e) => this.appStateService.setError(e.error),
    });
  }

  async onSubmit() {
    const categories = this.form.get('selectedCategories')?.value as Category[];
    const difficulty = this.form.get('selectedDifficulty')?.value as Difficulty;

    try {
      let photo = this.form.get('photoFile')?.value;
      if (photo != null) {
        let fileUploadResult = await lastValueFrom(this.fileStorageService.uploadFile(photo));
        photo = fileUploadResult.imageUrl;
      } else {
        photo = this.form.get('photo')?.value;
      }
      const response = await lastValueFrom(this.recipeService.updateRecipe(
        this.recipeId,
        this.form.get('title')?.value,
        this.form.get('text')?.value,
        photo,
        categories.map((e) => e._id),
        difficulty._id,
        localStorage.getItem('session'),
      ));

      this.appStateService.setMessage('Updated recipe');
    } catch (error: any) {
      this.appStateService.setError(error.error);

      if (error.status == 401) {
        this.localStorageService.setSession(null);
        this.router.navigate(['/']);
      }
    }
  }

  fileChangeEvent(event: any): void {
    this.showCropModal = true;
    this.originalFile = event.currentTarget.files[0];
    this.imageChangedEvent = event;
  }

  onHideDialog() {
    this.form.get('originalPhoto')?.setValue(null);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
  }

  cropImage() {
    this.form.get('photo')?.setValue(this.croppedImageBase64);

    const fileBlob = base64ToFile(this.croppedImageBase64);
    const file: File = new File([fileBlob], this.originalFile!.name, { lastModified: this.originalFile!.lastModified, type: this.originalFile!.type });
    this.form.get('photoFile')?.setValue(file);

    this.showCropModal = false;
  }

  cancelPhoto() {
    this.form.get('photo')?.setValue(null);
    this.form.get('photoFile')?.setValue(null);
  }

  deleteRecipe(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this recipe?',
      header: 'Delete Recipe',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: async () => {
        try {
          const response = await lastValueFrom(this.recipeService.deleteRecipe(this.recipeId, localStorage.getItem('session')))
          this.appStateService.setMessage('Recipe deleted');
          this.router.navigate(['/my-recipes']);
        } catch (error: any) {
          this.appStateService.setError(error.error);

          if (error.status == 401) {
            this.localStorageService.setSession(null);
            this.router.navigate(['/']);
          }
        }
      },
      reject: () => { }
    });
  }
}
